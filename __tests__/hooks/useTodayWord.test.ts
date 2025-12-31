import { useTodayWord } from "@/hooks/useTodayWord";
import { IWord } from "@/interfaces";
import { act, renderHook, waitFor } from "@testing-library/react";
import { fetchRandomWord } from "@/lib/utils";

vi.mock("@/lib/utils", () => ({
  fetchRandomWord: vi.fn(),
}));

const mockWord: IWord = {
  word: "صدق",
  diacritic: "صِدق",
  meaning: "قول الحق",
  explanation: "عكس الكذب",
  example: "الصدق منجاة",
  category: "قيم",
  rarity: 3,
};

const today = new Date().toDateString();

describe("useTodayWord hook tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("loads word from localStorage if date is today", async () => {
    localStorage.setItem(
      "todayWord",
      JSON.stringify({ word: mockWord, date: today })
    );

    const { result } = renderHook(() => useTodayWord());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.todayWord).toEqual(mockWord);
    expect(fetchRandomWord).not.toHaveBeenCalled();
  });

  it("fetches a new word if none is stored", async () => {
    vi.mocked(fetchRandomWord).mockResolvedValue(mockWord);

    const { result } = renderHook(() => useTodayWord());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchRandomWord).toHaveBeenCalled();
    expect(result.current.todayWord).toEqual(mockWord);
  });

  it("fetches a new word if stored date is not today", async () => {
    localStorage.setItem(
      "todayWord",
      JSON.stringify({
        word: mockWord,
        date: "OLD_DATE",
      })
    );

    vi.mocked(fetchRandomWord).mockResolvedValue(mockWord);
    const { result } = renderHook(() => useTodayWord());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(fetchRandomWord).toHaveBeenCalled();
    expect(result.current.todayWord).toEqual(mockWord);
  });

  it("refreshWord fetches a new word", async () => {
    vi.mocked(fetchRandomWord).mockResolvedValue(mockWord);
    const { result } = renderHook(() => useTodayWord());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const newWord = { ...mockWord, word: "test Word" };
    vi.mocked(fetchRandomWord).mockResolvedValue(newWord);

    await act(async () => {
      await result.current.refreshWord();
    });

    expect(result.current.todayWord).toEqual(newWord);
  });
});
