import DocumentResultPanel from "./DocumentResultPanel";

function ResultPanel(props) {
  const { results, topResults, faqResults, docResults } = props;

  return <DocumentResultPanel docResults={docResults} />;
}
export default ResultPanel;
