import pkg, { type IndexOptionsForDocumentSearch } from "flexsearch";
import { useEffect, useState } from "react";
import { TRANSITION_DURATION } from "../../tailwind.config";
const { Document } = pkg;

const documentIndexParams = {
  document: {
    id: "id",
    index: [
      {
        field: "name",
        tokenize: "full",
      },
    ],
    store: true,
  },
} satisfies IndexOptionsForDocumentSearch<unknown, boolean>;

export const useCombobox = <T>(data: T[]) => {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(data);
  const [searchIndex, setSearchIndex] = useState(
    new Document(documentIndexParams)
  );

  function searchFilterData(event: React.ChangeEvent<HTMLInputElement>) {
    // show all data if the search input is empty
    if (!event.target.value) {
      setSearchResults(data);
      return;
    }
    // enrich to return the whole documents
    const [nameFieldResult] = searchIndex.search(event.target.value, {
      enrich: true,
      index: "name",
      limit: 100,
    });
    const formattedResults = nameFieldResult?.result.map((result) => {
      // @ts-ignore wrong type after enrich
      const doc = result.doc;
      return doc as unknown as T;
    });
    setSearchResults(formattedResults ?? ([] as T[]));
  }

  // Initialize the data index
  useEffect(() => {
    const index = new Document(documentIndexParams);
    for (const item of data) {
      index.add(item);
    }
    setSearchIndex(index);
  }, [data]);

  // Reset the search results after closing the combobox
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchResults(data);
      }, TRANSITION_DURATION);
    }
  }, [open, data]);

  return {
    searchResults,
    searchFilterData,
    open,
    setOpen,
  };
};
