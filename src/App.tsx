import { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import CollectionPage from "./pages/CollectionPage";

interface VolumeList {
  kind: string;
  totalItems: number;
  items: Volume[];
}

interface Volume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  categories?: string[];
  imageLinks?: ImageLinks;
  language: string;
  // Add other properties as needed
}

interface IndustryIdentifier {
  type: string;
  identifier: string;
}

interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  // Add other image sizes as needed
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  retailPrice: RetailPrice;
  // Add other sale info properties as needed
}

interface RetailPrice {
  amount: number;
  currencyCode: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  // Add other access info properties as needed
}

interface SearchInfo {
  textSnippet?: string;
}

type QueriesProps = {
  titleSearch: string;
  authorSearch: string;
  orderBy: string;
  printType: string;
  startIndex: number;
};

const App = () => {
  const [books, setBooks] = useState<VolumeList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [queries, setQueries] = useState<QueriesProps | null>({
    titleSearch: "",
    authorSearch: "",
    orderBy: "relevance",
    printType: "all",
    startIndex: 0,
  });
  const categories = [
    "romance",
    "mystery",
    "pirate",
    "think",
    "space",
    "earth",
    "first",
    "children",
    "haunted",
  ];

  const handleQueries = (searchQueries: QueriesProps) => {
    setQueries(searchQueries);
  };

  useEffect(() => {
    fetchData();
  }, [queries, queries?.startIndex]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const randomCategories =
        categories[Math.floor(Math.random() * categories.length)];

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          queries?.titleSearch || randomCategories
        }+inauthor:${queries?.authorSearch}&projection=lite&printType=${
          queries?.printType
        }&orderBy=${queries?.orderBy}&startIndex=${
          queries?.startIndex
        }&maxResults=24&key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
      console.log(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/Book-Haven/" element={<Layout />}>
        <Route
          index
          element={<HomePage books={books} isLoading={isLoading} />}
        />
        <Route
          path="collection"
          element={
            <CollectionPage
              books={books}
              isLoading={isLoading}
              sendDataToApp={handleQueries}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
