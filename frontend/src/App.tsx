import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8000/data')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data')
        return res.json()
      })
      .then((data) => {
        setCandidates(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <h2>Candidate</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && candidates.length > 0 && (
        <div>
          <table cellPadding={4} style={{ margin: '1em 0' }}>
            <tbody>
              {Array.from({ length: Math.ceil(candidates.length / 10) }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {candidates.slice(rowIdx * 10, rowIdx * 10 + 10).map((row, colIdx) => (
                    <td key={colIdx} style={{ padding: 0 }}>
                      <a
                        href={`https://histock.tw/stock/${row.StockCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <button
                          style={{
                            background: row.PurchasedLot > 0 ? '#666' : '#eee', // dark grey if PurchasedLot > 0, else light grey
                            color: row.PurchasedLot > 0 ? '#fff' : '#000',
                            border: 'none',
                            width: '120px',
                            height: '40px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'inline-block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                          }}
                        >
                          {row.CompanyName}
                        </button>
                      </a>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '1em', fontStyle: 'italic', color: '#666', textAlign: 'left' }}>
            Dark grey button means Holding Stock
          </div>
        </div>
      )}
    </>
  )
}

export default App