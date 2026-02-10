import { screen } from "@testing-library/react";
import WordCard from "@/components/word-card";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import { Word } from "@/types/models/word";

const mockWord: Word = {
  word: "صدق",
  diacritic: "صِدق",
  meaning: "قول الحق",
  explanation: "عكس الكذب",
  example: "الصدق منجاة",
  category: "قيم",
};

const renderWordCard = () => renderWithProviders(<WordCard word={mockWord} />);

vi.mock("@/contexts/FavoritesContext", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/contexts/favorites-context")>();

  return {
    ...actual,
    useFavorites: () => ({
      addWord: mockAddWord,
      removeWord: mockRemoveWord,
      isFavorite: mockIsFavorite,
    }),
  };
});

const mockAddWord = vi.fn();
const mockRemoveWord = vi.fn();
const mockIsFavorite = vi.fn();

describe("WordCard Component", () => {
  it("renders the word and its meaning", () => {
    renderWordCard();

    expect(
      screen.getByRole("heading", { name: "صدق", level: 4 }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("قول الحق")).toHaveLength(2);
  });

  it("opens bottom sheet when card is clicked", async () => {
    const user = userEvent.setup();
    renderWordCard();

    await user.click(
      screen.getByRole("button", { name: "فتح تفاصيل كلمة صدق" }),
    );

    expect(screen.getByText("الشرح")).toBeInTheDocument();
    expect(screen.getByText("مثال في جملة")).toBeInTheDocument();
  });

  it("shows add to favorites button when word is not favorite", async () => {
    mockIsFavorite.mockReturnValue(false);
    renderWordCard();
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "فتح تفاصيل كلمة صدق" }),
    );

    expect(
      screen.getByRole("button", { name: "إضافة للمفضلة" }),
    ).toBeInTheDocument();
  });

  it("shows remove from favorites button when word is favorite", async () => {
    mockIsFavorite.mockReturnValue(true);
    renderWordCard();
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "فتح تفاصيل كلمة صدق" }),
    );

    expect(
      screen.getByRole("button", { name: "حذف من المفضلة" }),
    ).toBeInTheDocument();
  });

  it("calls removeWord when remove favorite is clicked", async () => {
    mockIsFavorite.mockReturnValue(true);
    const user = userEvent.setup();
    renderWordCard();

    await user.click(
      screen.getByRole("button", { name: "فتح تفاصيل كلمة صدق" }),
    );

    await user.click(screen.getByRole("button", { name: "حذف من المفضلة" }));

    expect(mockRemoveWord).toHaveBeenCalledWith(mockWord.word);
  });
});
