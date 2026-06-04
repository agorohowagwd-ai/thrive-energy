export default function Premium() {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm">
  
        <h2 className="text-3xl font-semibold mb-6">
          Premium
        </h2>
  
        <ul className="space-y-3 mb-8">
  
          <li>✓ AI Analysis</li>
  
          <li>✓ Unlimited Entries</li>
  
          <li>✓ Smart Reports</li>
  
          <li>✓ Future Predictions</li>
  
        </ul>
  
        <button
          className="
          bg-orange-400
          text-white
          px-6
          py-3
          rounded-xl
          "
        >
          Upgrade — $9/month
        </button>
  
      </div>
    )
  }