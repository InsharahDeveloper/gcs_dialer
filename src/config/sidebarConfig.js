export const SIDEBAR_CONFIG = [
  {
    match: "/calls",
    title: "Calls",
    items: [
      { id: "1", name: "Ahmed", subtitle: "2 min ago", path: "/calls/1" },
      { id: "2", name: "Bilal", subtitle: "Yesterday", path: "/calls/2" },
    ],
  },
  {
    match: "/messages",
    title: "Messages",
    items: [
      { id: "10", name: "Ayesha", subtitle: "Hey!",    path: "/messages/10" },
      { id: "11", name: "Hamza",  subtitle: "Missed",  path: "/messages/11" },
    ],
  },
  {
    match: "/contacts",
    title: "Contacts",
    items: [
      { id: "20", name: "Ali",  path: "/contacts/20" },
      { id: "21", name: "Zain", path: "/contacts/21" },
    ],
  },
];
