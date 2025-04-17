
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.get(`/api/analyze?symbol=${symbol}&timeframe=${timeframe}`);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">تحلیل ساختاری هوش مصنوعی</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="نماد (مثلاً BTCUSD)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="تایم‌فریم (مثلاً 15m)"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleAnalyze} className="bg-blue-600 text-white px-4 py-2 rounded">
          تحلیل کن
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow">
            <p><strong>نماد:</strong> {result.symbol}</p>
            <p><strong>تایم‌فریم:</strong> {result.timeframe}</p>
            <p><strong>ساختار:</strong> {result.structure}</p>
            <p><strong>متن تحلیل:</strong> {result.analysisText}</p>
            <p><strong>نوع سیگنال:</strong> {result.signalType}</p>
            <p><strong>قدرت سیگنال:</strong> {result.signalStrength}%</p>
            <p><strong>تأییدیه:</strong> {result.confirmation}</p>
            <p><strong>منطقه ورود:</strong> ورود: {result.entryZone.entry} | حد ضرر: {result.entryZone.stopLoss} | تارگت: {result.entryZone.target}</p>
          </div>
        )}
      </div>
    </div>
  );
}
