export default function HistoryPanel({ history }) {
  return (
    <div className="history-panel">
      {history.length === 0 ? (
        <div className="no-history">There's no history yet</div>
      ) : (
        history.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-equation">{item.equation}</div>
            <div className="history-result">{item.result}</div>
          </div>
        ))
      )}
    </div>
  );
}
