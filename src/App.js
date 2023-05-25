import "./App.css";
import ResultPanel from "./components/ResultPanel";
import { kendra } from "./services/Kendra";
import { useEffect, useState } from "react";

import {
  QueryResultType,
  Relevance,
  QuerySuggestionsMode,
} from "./components/constants";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Results
  const [allResults, setItems] = useState([]);
  const [topResults, setTopResults] = useState([]);
  const [faqResults, setFAQResults] = useState([]);
  const [docResults, setDocResults] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  //Query Builder
  const queryRequest = {
    IndexId: "4bad54f4-e65f-4268-9748-5aed28ae83e9",
    QueryText: "what is s3",
    PageNumber: currentPage,
  };

  // API to fetch Items
  const fetchItems = async () => {
    let results;
    if (kendra === undefined) {
      console.error("ERROR kendra didnt UP");
    } else {
      try {
        results = await kendra.query(queryRequest).promise();
      } catch (e) {
        // return;
      }
    }
    if (results && results.ResultItems !== null) {
      const tempTopResults = [];
      const tempFAQResults = [];
      const tempDocumentResults = [];
      results.ResultItems.forEach((result) => {
        switch (result.Type) {
          case QueryResultType.Answer:
            tempTopResults.push(result);
            break;
          case QueryResultType.QuestionAnswer:
            tempFAQResults.push(result);
            break;
          case QueryResultType.Document:
            tempDocumentResults.push(result);
            break;
          default:
            break;
        }
      });

      setTopResults(tempTopResults);
      setFAQResults(tempFAQResults);
      setDocResults(tempDocumentResults);
      setItems(results);
      // console.log("docum" + JSON.stringify(tempDocumentResults));
      // console.log("faq" + JSON.stringify(tempFAQResults));
      // console.log("top" + JSON.stringify(tempTopResults));
      // console.log("all" + JSON.stringify(results));
    }
  };

  useEffect(() => {
    // fetchItems();
  });

  return (
    <div>
      <button onClick={() => fetchItems()}>Hello</button>
      <ResultPanel
        results={allResults}
        topResults={topResults}
        faqResults={faqResults}
        docResults={docResults}
      />
    </div>
  );
}

export default App;
