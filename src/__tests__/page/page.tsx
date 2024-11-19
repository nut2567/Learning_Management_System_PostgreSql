import axios from "axios";
import { getProduct } from "@/utils/api";
import { jest } from "@jest/globals";

jest.mock("axios");

describe("getProduct API function", () => {
  it("fetches products successfully with correct filters", async () => {
    const mockResponse = {
      data: {
        courses: [
          { id: 1, name: "Course 1" },
          { id: 2, name: "Course 2" },
        ],
        total: 2,
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const filters = {
      Instructor: "1",
      Status: "Open",
      Level: "Advanced",
      Sort: "A-Z",
    };
    const result = await getProduct(1, 9, filters);

    expect(axios.get).toHaveBeenCalledWith("/api/getcourse", {
      params: { page: 1, limit: 9, ...filters },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("returns empty array and total 0 when API fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    const filters = { Instructor: "", Status: "", Level: "", Sort: "" };
    const result = await getProduct(1, 9, filters);

    expect(result).toEqual({ product: [], total: 0 });
  });
});
