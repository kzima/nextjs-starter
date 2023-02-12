import create from "zustand";

export type SectionItem = {
  label?: string;
  value?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  id: string;
  icon?: string;
  current?: boolean;
  href?: string;
};

export interface DocumentCurrent {
  sectionsAvailable: SectionItem[];
  sections: SectionItem[];
  getAvailableSections: () => SectionItem[];
}

export const useDocumentCurrentStore = create<DocumentCurrent>((set, get) => ({
  sectionsAvailable: [
    {
      id: "intro",
      label: "Intro",
      description: "dfdffg",
    },
    { id: "section", label: "Section 1", description: "dxsddsd" },
  ],
  sections: [],
  getAvailableSections: () => {
    return get().sectionsAvailable.map((item) => {
      const foundSection = get().sections.find(
        (foundItem) => foundItem.id === item.id
      );
      if (foundSection) {
        return { ...item, defaultChecked: true };
      }
      return { ...item, defaultChecked: false };
    });
  },
}));

export interface App {
  page: { title: string };
}

export const useAppStore = create<App>((set, get) => ({
  page: {
    title: "Home",
  },
}));
