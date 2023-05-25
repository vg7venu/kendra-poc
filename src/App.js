import "./App.css";
import ResultPanel from "./components/ResultPanel";
import Pagination from "./components/pagination/Pagination";
import { kendra } from "./services/Kendra";
import { useEffect, useState } from "react";

import {
  QueryResultType,
  Relevance,
  QuerySuggestionsMode,
} from "./components/constants";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const [queryText, setQueryText] = useState("ec2");

  // Results
  const [allResults, setItems] = useState([]);
  const [topResults, setTopResults] = useState([]);
  const [faqResults, setFAQResults] = useState([]);
  const [docResults, setDocResults] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  //Query Builder

  // API to fetch Items
  const getResultsHelper = async (queryText, pageNumber) => {
    const queryRequest = {
      IndexId: "4bad54f4-e65f-4268-9748-5aed28ae83e9",
      QueryText: queryText,
      PageNumber: pageNumber,
    };

    let results;
    if (kendra === undefined) {
      console.error("ERROR kendra didnt UP");
    } else {
      try {
        queryRequest.QueryText = queryText;
        queryRequest.PageNumber = pageNumber;
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

  const getResultsOnPageChanging = async (queryText, pageNumber) => {
    computeFilterAndReSubmitQuery(queryText, pageNumber);
  };

  const computeFilterAndReSubmitQuery = (queryText, pageNumber) => {
    // const filter = this.state.selectedFacets.buildAttributeFilter(
    //   this.state.attributeTypeLookup
    // );
    getResultsHelper(queryText, pageNumber);
  };

  useEffect(() => {
    // fetchItems();
  });

  return (
    <div>
      <button onClick={() => getResultsHelper("ec2", 1)}>Hello</button>
      <ResultPanel
        results={allResults}
        topResults={topResults}
        faqResults={faqResults}
        docResults={docResults}
      />
      <Pagination
        queryText={queryText}
        currentPageNumber={currentPage}
        onSubmit={() => getResultsOnPageChanging(queryText, currentPage)}
        results={allResults}
      />
    </div>
  );
}

export default App;
