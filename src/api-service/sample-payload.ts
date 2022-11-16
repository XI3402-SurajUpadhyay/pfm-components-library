export const data: any = {
  children: [
    {
      name: "ENTERTAINMENT/SHOPPING/LIFESTYLE",
      value: 143.95,
      children: [
        {
          name: "CLOTHING SHOES ACCESSORIES",
          value: 126.98,
          children: [],
        },
        {
          name: "PERSONAL CARE AND COSMETICS",
          value: 16.97,
          children: [],
        },
      ],
    },
    {
      name: "DINING",
      value: 225.09000000000003,
      children: [
        { name: "COFFEE SHOPS", value: 19.42, children: [] },
        {
          name: "RESTAURANTS/DINING/ FAST FOODS/ CAFES",
          value: 205.67000000000002,
          children: [],
        },
      ],
    },
  ],
};

export const dataFormatForChart: any = {
  name: "Txn",
  children: [
    {
      name: "Entertainment",
      children: [
        {
          name: "Bills",
          children: [
            { name: "lifestyle", value: 3000 },
            { name: "Electricity", value: 6000 },
          ],
        },
        {
          name: "Petrol",
          value: 10000,
        },
        {
          name: "Food",
          children: [
            { name: "grocery", value: 15000 },
            { name: "cooking oil", value: 2000 },
            { name: "Resturant", value: 5000 },
            {
              name: "Online",
              value: 6000,
              children: [
                { name: "Swiggy", value: 2000 },
                { name: "Zomato", value: 1000 },
                { name: "Dominous", value: 800 },
                { name: "Pizahut", value: 500 },
              ],
            },
            { name: "party", value: 3000 },
          ],
        },

        { name: "Mobile Recharge", value: 1000 },

        { name: "Rent", value: 35000 },
      ],
    },

    {
      name: "Investment",
      children: [
        {
          name: "Bank",
          children: [
            { name: "RD", value: 5000 },
            { name: "FD", value: 10000 },
          ],
        },
        { name: "crypto", value: 5000 },
        {
          name: "Share Market",
          children: [
            { name: "Stocks", value: 15000 },
            {
              name: "Mutual funds",
              children: [
                { name: "debt", value: 5000 },
                { name: "equity", value: 15000 },
                { name: "liqued", value: 2000 },
              ],
            },
          ],
        },
      ],
    },

    {
      name: "Saving",
      children: [
        { name: "SBI Bank", value: 20000 },
        { name: "ICICI Bank", value: 25000 },
      ],
    },

    {
      name: "Entertainment",
      children: [
        {
          name: "OTT",
          children: [
            { name: "Amazon Prime", value: 499 },
            { name: "Netflix", value: 999 },
            { name: "Hotstar", value: 249 },
            { name: "voot", value: 249 },
          ],
        },
        {
          name: "Shopping",
          children: [
            { name: "Mall", value: 5000 },
            { name: "Myntra", value: 2000 },
            { name: "Amazon", value: 1500 },
          ],
        },
        {
          name: "Gaming",
          children: [{ name: "PS5", value: 2000 }],
        },
      ],
    },
  ],
};
