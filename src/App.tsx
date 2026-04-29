/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Search, 
  TrendingUp, 
  FileText, 
  RefreshCw, 
  Building2, 
  Cpu, 
  ExternalLink,
  ChevronRight,
  Database,
  Cloud
} from 'lucide-react';
import { generateWeeklyReport } from './services/geminiService';
import { WeeklyReport } from './types.ts';

export default function App() {
  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const data = await generateWeeklyReport();
      setReport(data);
    } catch (error) {
      console.error('Failed to fetch report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100 selection:text-blue-900 leading-normal">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <BarChart3 size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">AI Strategy & Innovation</h1>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Weekly Intelligence Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              {report?.date || 'Updating...'}
            </div>
            <button 
              id="run-research-btn"
              onClick={fetchReport}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Run Research
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <AnimatePresence mode="wait">
          {!report && loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[60vh] flex flex-col items-center justify-center gap-4"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Database size={24} className="text-blue-600 animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="font-bold text-xl mb-1">Scanning Global Markets</h2>
                <p className="text-gray-500 max-w-xs mx-auto text-sm">Identifying cross-industry AI integrations in customer service systems...</p>
              </div>
            </motion.div>
          ) : report ? (
            <motion.div
              key={report.date + (loading ? '-loading' : '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Executive Summary */}
              <section id="executive-summary" className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <FileText size={120} />
                </div>
                <div className="relative z-10 max-w-3xl">
                  <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Executive Summary</h2>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-gray-800 italic">
                    "{report.executiveSummary}"
                  </p>
                </div>
              </section>

              {/* Adoption Table */}
              <section id="adoption-table" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <Building2 size={20} className="text-gray-400" />
                    New Adoptions This Week
                  </h3>
                  <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-full w-fit tracking-widest uppercase">
                    5 Strategic Entities
                  </span>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Company</th>
                          <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">AI Feature</th>
                          <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Technology Used</th>
                          <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Business Impact</th>
                          <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">View Detail</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {report.companies.map((company, idx) => (
                          <motion.tr 
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`group transition-colors cursor-pointer ${selectedCompany === idx ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}
                            onClick={() => setSelectedCompany(selectedCompany === idx ? null : idx)}
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                                  {company.company[0]}
                                </div>
                                <span className="font-bold text-gray-900">{company.company}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-50 text-cyan-700 rounded-md text-xs font-semibold border border-cyan-100">
                                <Cpu size={12} />
                                {company.feature}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-sm font-medium text-gray-600">
                              <div className="flex items-center gap-2">
                                <Cloud size={14} className="text-blue-400" />
                                {company.technology}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                {company.impact}
                              </p>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <div className={`inline-flex p-2 rounded-lg transition-colors ${selectedCompany === idx ? 'text-blue-600 bg-blue-100' : 'text-gray-300 group-hover:text-gray-600 group-hover:bg-gray-100'}`}>
                                <ChevronRight size={20} className={`transform transition-transform ${selectedCompany === idx ? 'rotate-90' : ''}`} />
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Detail View (Focused) */}
              <AnimatePresence>
                {selectedCompany !== null && (
                  <motion.div 
                    id="company-detail"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-gray-900 text-white rounded-2xl p-8 border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">
                            <TrendingUp size={12} />
                            Strategic Integration Overview
                          </div>
                          <h3 className="text-4xl font-bold mb-4 tracking-tight">{report.companies[selectedCompany].company}</h3>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold border border-white/5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Latest Implementation
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-gray-400 uppercase">Motivation & Rationale</h4>
                          <p className="text-lg text-gray-300 font-light leading-relaxed">
                            {report.companies[selectedCompany].why}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4 place-content-start">
                        <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 transition-colors">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Primary Asset</p>
                          <p className="text-sm font-bold flex items-center gap-2">
                            <Cpu size={14} className="text-blue-400" />
                            {report.companies[selectedCompany].feature}
                          </p>
                        </div>
                        <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 transition-colors text-right">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Market Source</p>
                          <p className="text-sm font-bold flex items-center gap-2 justify-end">
                            {report.companies[selectedCompany].source}
                            <ExternalLink size={14} className="text-blue-400" />
                          </p>
                        </div>
                        <div className="col-span-2 p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Reported Operational Success</p>
                          <p className="text-xl font-bold leading-tight">{report.companies[selectedCompany].impact}</p>
                        </div>
                        <div className="col-span-2 flex justify-end pt-4">
                          <button 
                            onClick={() => setSelectedCompany(null)}
                            className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
                          >
                            Close Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Insights */}
              <div className="grid lg:grid-cols-3 gap-8 pb-12">
                {/* Trends */}
                <div id="trend-insights" className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-2 px-2">
                    <TrendingUp size={20} className="text-blue-600" />
                    <h3 className="font-bold text-xl">Macro Trends in AI Adoptions</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {report.trends.map((trend, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4"
                      >
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 border border-blue-100">
                          {idx + 1}
                        </div>
                        <p className="text-sm font-semibold text-gray-700 leading-snug">{trend}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Citations */}
                <div id="citations" className="space-y-6">
                  <div className="flex items-center gap-2 px-2">
                    <FileText size={20} className="text-blue-600" />
                    <h3 className="font-bold text-xl">References</h3>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-full relative">
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Intelligence Hub</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black text-blue-600 tracking-tighter">PERPLEXITY VERIFIED</span>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {report.citations.map((cite, idx) => (
                        <li key={idx} className="flex gap-3 text-xs text-gray-500 hover:text-blue-600 transition-colors cursor-pointer group">
                          <span className="font-bold text-blue-300">[{idx + 1}]</span>
                          <span className="leading-relaxed border-b border-transparent group-hover:border-blue-400 pb-0.5">{cite}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="absolute bottom-6 left-8 right-8 pt-6 border-t border-gray-50">
                      <p className="text-[10px] text-gray-400 italic">Automated cross-referencing enabled via Perplexity Search Grounds.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Persistence State Overlay */}
      {loading && report && (
        <div className="fixed bottom-8 right-8 z-[100]">
          <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20">
            <RefreshCw size={14} className="animate-spin text-blue-400" />
            <span className="text-xs font-bold tracking-tight">Refreshing Market Intelligence...</span>
          </div>
        </div>
      )}
    </div>
  );
}
