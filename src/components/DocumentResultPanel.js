import { isNullOrUndefined, selectMostRecentUpdatedTimestamp } from "./utils";

import ResultTitle from "./ResultTitle";
import ResultFooter from "./ResultFooter";
import ResultText from "./ResultText";
function DocumentResultPanel(props) {
  const { docResults } = props;
  const renderResults = (docResults) => {
    let attributes = Object();
    if (!isNullOrUndefined(docResults.DocumentAttributes)) {
      docResults.DocumentAttributes.forEach((attribute) => {
        attributes[attribute.Key] = attribute.Value;
      });
    }

    const lastUpdated = selectMostRecentUpdatedTimestamp(attributes);

    return (
      <div className="container-body" key={docResults.Id}>
        <ResultTitle queryResultItem={docResults} attributes={attributes} />
        <ResultText
          className="small-margin-bottom"
          text={docResults.DocumentExcerpt}
          lastUpdated={lastUpdated}
        />
        <ResultFooter queryResultItem={docResults} attributes={attributes} />
      </div>
    );
  };

  return (
    <div className="document-results-section">
      {docResults.map(renderResults)}
    </div>
  );
}

export default DocumentResultPanel;
