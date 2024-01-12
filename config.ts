export const config = {
  wardName: "Sycamores Stake Young Women",
  apiUrl: "https://api.latterdayward.com/api",
  apiWard: "sycamores-yw-camp",
  apiHeaders: {
    headers: {
      "x-api-key": process.env.LDW_KEY,
      "Content-Type": "application/json",
    },
  },
  pages: {
    index: {
      heroCardId: "65a1bafe550979519c07acb7",
    },
  },
  httpHeaders: {
    "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
  },
}