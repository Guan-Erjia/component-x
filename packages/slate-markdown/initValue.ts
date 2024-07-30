export const initialValue = [
  {
    type: "heading",
    depth: 1,
    children: [
      {
        text: "heading 1",
      },
    ],
  },
  {
    type: "heading",
    depth: 2,
    children: [
      {
        text: "heading 2",
      },
    ],
  },
  {
    type: "heading",
    depth: 3,
    children: [
      {
        text: "heading 3",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "aaaaaaaa",
      },
      {
        strong: true,
        text: "bold",
      },
      {
        emphasis: true,
        text: "emphasis",
      },
    ],
  },
  {
    type: "list",
    children: [
      {
        type: "listItem",
        children: [
          {
            text: "ordered list2",
          },
        ],
      },
      {
        type: "listItem",
        children: [
          {
            text: "ordered list3",
          },
        ],
      },
      {
        type: "listItem",
        children: [
          {
            text: "ordered list4",
          },
        ],
      },
    ],
    ordered: true,
  },
  {
    type: "paragraph",
    children: [
      {
        text: "This is ",
      },
      {
        type: "link",
        children: [
          {
            text: "link to GitHub.com",
          },
        ],
        url: "https://github.com/",
      },
      {
        text: ".",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "This is ",
      },
      {
        type: "image",
        url: "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        text: ".",
      },
    ],
  },
  {
    type: "blockquote",
    children: [
      {
        type: "paragraph",
        children: [
          {
            text: "quote\nquote\nquote\nquote",
          },
        ],
      },
    ],
  },
];
