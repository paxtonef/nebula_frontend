"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Users, DollarSign, Globe, Shield, Zap, FileText, Download, RefreshCw, Play, Database, BarChart3 } from 'lucide-react';

const McKinseyBIDashboard = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sampleData, setSampleData] = useState(null);

  // API Configuration - Railway URL
  const API_BASE_URL = 'https://mrag-consulting-backend-production.up.railway.app';

  // Fetch sample data for testing
  const fetchSampleData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sample_data`);
      if (response.ok) {
        const data = await response.json();
        setSampleData(data.social_media_companies);
      } else {
        // Fallback to hardcoded sample data if endpoint not available
        console.log('Sample data endpoint not available, using fallback data');
        setSampleData([
          { company_name: "Meta", industry: "Social Media", revenue: 117929, employees: 67317, growth_rate: 3.2, market_cap: 756000 },
          { company_name: "TikTok", industry: "Social Media", revenue: 9400, employees: 110000, growth_rate: 18.5, market_cap: 75000 },
          { company_name: "LinkedIn", industry: "Social Media", revenue: 13816, employees: 16000, growth_rate: 8.1, market_cap: 26000 },
          { company_name: "Snapchat", industry: "Social Media", revenue: 4602, employees: 5661, growth_rate: 12.3, market_cap: 18000 },
          { company_name: "Pinterest", industry: "Social Media", revenue: 2578, employees: 3500, growth_rate: 9.6, market_cap: 21000 }
        ]);
      }
    } catch (err) {
      console.error('Error fetching sample data:', err);
      // Use fallback data on error
      setSampleData([
        { company_name: "Meta", industry: "Social Media", revenue: 117929, employees: 67317, growth_rate: 3.2, market_cap: 756000 },
        { company_name: "TikTok", industry: "Social Media", revenue: 9400, employees: 110000, growth_rate: 18.5, market_cap: 75000 },
        { company_name: "LinkedIn", industry: "Social Media", revenue: 13816, employees: 16000, growth_rate: 8.1, market_cap: 26000 }
      ]);
    }
  };

  // Process accounts with proper backend format
  const processAccounts = async (useDefaultStrategy = true) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use sample data or default data for analysis
      const accountsToAnalyze = sampleData || [
        { company_name: "Meta", industry: "Social Media", revenue: 117929, employees: 67317, growth_rate: 3.2, market_cap: 756000 },
        { company_name: "TikTok", industry: "Social Media", revenue: 9400, employees: 110000, growth_rate: 18.5, market_cap: 75000 },
        { company_name: "LinkedIn", industry: "Social Media", revenue: 13816, employees: 16000, growth_rate: 8.1, market_cap: 26000 }
      ];

      const requestPayload = {
        bizdev_strategy: {
          target_market: "enterprise_tech",
          focus_areas: ["AI transformation", "ESG optimization", "cybersecurity"],
          investment_threshold: 50000000,
          growth_targets: { revenue: 25, market_share: 15 }
        },
        accounts: accountsToAnalyze,
        num_accounts_to_process: accountsToAnalyze.length,
        analysis_parameters: {
          include_porter_analysis: true,
          include_esg_metrics: true,
          include_cybersecurity_assessment: true,
          benchmarking_enabled: true
        }
      };
      
      const response = await fetch(`${API_BASE_URL}/process_accounts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      setError(`Failed to fetch analysis: ${err.message}`);
      console.error('Error fetching analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSampleData();
  }, []);

  const porterColors = ['#1e40af', '#dc2626', '#059669', '#d97706', '#7c3aed'];
  
  const formatPorterDataForRadar = (porterForces) => {
    if (!porterForces) return [];
    
    return [
      { force: 'New Entrants', value: porterForces.threat_of_new_entrants * 20 },
      { force: 'Suppliers', value: porterForces.bargaining_power_suppliers * 20 },
      { force: 'Buyers', value: porterForces.bargaining_power_buyers * 20 },
      { force: 'Substitutes', value: porterForces.threat_of_substitutes * 20 },
      { force: 'Rivalry', value: porterForces.competitive_rivalry * 20 },
    ];
  };

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  const ExecutiveSummaryCard = ({ summary, analysisData }) => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-600 rounded-lg mr-4">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
          <p className="text-blue-600 font-medium">Business Intelligence Analysis</p>
        </div>
      </div>
      
      {analysisData ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900">Portfolio Overview</h4>
              <p className="text-sm text-gray-700 mt-1">
                {analysisData.total_accounts} companies analyzed, {analysisData.qualified_accounts} qualified
              </p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                {analysisData.qualified_accounts > 0 ? Math.round((analysisData.qualified_accounts / analysisData.total_accounts) * 100) : 0}% success rate
              </p>
            </div>
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900">Processing Time</h4>
              <p className="text-sm text-gray-700 mt-1">Analysis completed in</p>
              <p className="text-lg font-bold text-green-600 mt-2">{analysisData.processing_time_seconds?.toFixed(2)}s</p>
            </div>
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900">Request ID</h4>
              <p className="text-sm text-gray-700 mt-1">Tracking reference</p>
              <p className="text-xs font-mono text-gray-600 mt-2">{analysisData.request_id?.slice(-12)}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Analysis Status</h4>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800 font-medium">Analysis {analysisData.status}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Click "Run Analysis" to generate executive summary...</p>
        </div>
      )}
    </div>
  );

  const PorterAnalysisCard = ({ porterData }) => {
    const radarData = formatPorterDataForRadar(porterData);
    
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Porter's Five Forces Analysis</h3>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-gray-600" />
            {porterData && (
              <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {porterData.overall_attractiveness}/5.0 Attractiveness
              </span>
            )}
          </div>
        </div>
        
        {porterData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="force" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar name="Intensity" dataKey="value" stroke="#1e40af" fill="#1e40af" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">New Entrants Threat</span>
                  <span className="font-bold text-red-600">{porterData.threat_of_new_entrants}/5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Supplier Power</span>
                  <span className="font-bold text-orange-600">{porterData.bargaining_power_suppliers}/5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Buyer Power</span>
                  <span className="font-bold text-yellow-600">{porterData.bargaining_power_buyers}/5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Substitutes Threat</span>
                  <span className="font-bold text-green-600">{porterData.threat_of_substitutes}/5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Competitive Rivalry</span>
                  <span className="font-bold text-purple-600">{porterData.competitive_rivalry}/5</span>
                </div>
              </div>
            </div>
            
            {porterData.analysis_summary && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Market Analysis Summary</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{porterData.analysis_summary}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Run analysis to generate Porter's Five Forces...</p>
          </div>
        )}
      </div>
    );
  };

  const RecommendationsCard = ({ recommendations }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-600 rounded-lg mr-4">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Strategic Recommendations</h3>
      </div>
      
      {recommendations && recommendations.length > 0 ? (
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    rec.priority === 1 ? 'bg-red-500' : rec.priority === 2 ? 'bg-orange-500' : 'bg-green-500'
                  }`}>
                    {rec.priority}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{rec.title}</h4>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      rec.risk_level === 'High' ? 'bg-red-100 text-red-800' :
                      rec.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.risk_level} Risk
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{rec.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-medium text-blue-900">Investment:</span>
                  <p className="text-blue-700">${rec.investment_required}M</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <span className="font-medium text-green-900">Payback:</span>
                  <p className="text-green-700">{rec.payback_months} months</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <span className="font-medium text-purple-900">Impact:</span>
                  <p className="text-purple-700 text-xs">{rec.expected_impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Run analysis to generate strategic recommendations...</p>
        </div>
      )}
    </div>
  );

  const CompanyAnalysisCard = ({ results }) => {
    const scatterData = results ? results.map(company => ({
      name: company.company_name,
      revenue: company.raw_intelligence?.basic_info?.revenue || 1000,
      overall_score: company.overall_score * 100, // Convert to percentage
      confidence: company.confidence * 100,
      status: company.status
    })) : [];
    
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-indigo-600 rounded-lg mr-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Company Analysis</h3>
        </div>
        
        {results && results.length > 0 ? (
          <div className="space-y-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="overall_score" name="Overall Score" unit="%" />
                  <YAxis dataKey="confidence" name="Confidence" unit="%" />
                  <Tooltip formatter={(value, name) => [
                    `${value}%`,
                    name === 'overall_score' ? 'Overall Score' : 'Confidence'
                  ]} />
                  <Scatter name="Companies" dataKey="confidence" fill="#1e40af" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {results.map((company, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{company.company_name}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          company.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                          company.status === 'Potential' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {company.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          Revenue: ${company.raw_intelligence?.financial_info?.revenue || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(company.overall_score * 100)}%
                      </div>
                      <p className="text-xs text-gray-500">Overall Score</p>
                      <div className="text-sm font-medium text-gray-600 mt-1">
                        {Math.round(company.confidence * 100)}% confidence
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Reasoning</h5>
                    <p className="text-gray-700 text-sm">{company.reasoning}</p>
                  </div>

                  {company.category_scores && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-3">Category Scores</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(company.category_scores).map(([category, score]) => (
                          <div key={category} className="bg-gray-50 p-3 rounded">
                            <div className="text-xs text-gray-600 mb-1">
                              {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                            <div className="font-bold text-gray-900">{Math.round(score * 100)}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {company.pain_points && company.pain_points.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Pain Points</h5>
                      <ul className="space-y-1">
                        {company.pain_points.map((point, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {company.decision_makers && company.decision_makers.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Key Decision Makers</h5>
                      <div className="space-y-2">
                        {company.decision_makers.map((dm, idx) => (
                          <div key={idx} className="flex items-center p-2 bg-blue-50 rounded">
                            <Users className="w-4 h-4 text-blue-600 mr-2" />
                            <div>
                              <span className="font-medium text-gray-900">{dm.name}</span>
                              <span className="text-sm text-gray-600 ml-2">{dm.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {company.why_now_trigger && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-1">Why Now Trigger</h5>
                      <p className="text-sm text-green-800">{company.why_now_trigger}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Run analysis to view company details...</p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
          <p className="text-2xl font-bold text-gray-900">Generating McKinsey-Grade Analysis...</p>
          <p className="text-gray-600 mt-2">Processing portfolio with enterprise intelligence</p>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm max-w-md">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Porter's Forces • Strategic Recommendations • ESG Analysis</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">McKinsey BI Dashboard</h1>
              <p className="text-gray-600 mt-1">Enterprise-grade business intelligence with observability</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => processAccounts()}
                disabled={loading}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
              >
                <Play className="w-5 h-5 mr-2" />
                Run Analysis
              </button>
              <button
                onClick={fetchSampleData}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Database className="w-4 h-4 mr-2" />
                Load Sample Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Companies Analyzed"
            value={analysisData?.total_accounts?.toString() || "0"}
            subtitle={`${analysisData?.qualified_accounts || 0} qualified`}
            icon={Users}
          />
          <MetricCard
            title="Success Rate"
            value={analysisData?.total_accounts && analysisData?.qualified_accounts ? 
              `${Math.round((analysisData.qualified_accounts / analysisData.total_accounts) * 100)}%` : "N/A"}
            change={analysisData?.qualified_accounts > 0 ? "+High" : ""}
            icon={Target}
            trend={analysisData?.qualified_accounts > 0 ? "up" : "down"}
          />
          <MetricCard
            title="Processing Time"
            value={analysisData?.processing_time_seconds ? `${analysisData.processing_time_seconds.toFixed(1)}s` : "N/A"}
            subtitle="Analysis completed"
            icon={Zap}
          />
          <MetricCard
            title="Analysis Status"
            value={analysisData?.status || "Pending"}
            subtitle={analysisData?.request_id ? `ID: ${analysisData.request_id.slice(-8)}` : ""}
            icon={CheckCircle}
          />
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <ExecutiveSummaryCard summary={analysisData?.executive_summary} analysisData={analysisData} />
        </div>

        {/* Company Analysis */}
        <div className="mb-8">
          <CompanyAnalysisCard results={analysisData?.results} />
        </div>

        {/* Porter's Five Forces and Strategic Recommendations - Only show if available */}
        {(analysisData?.porter_forces || analysisData?.strategic_recommendations) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {analysisData?.porter_forces && <PorterAnalysisCard porterData={analysisData.porter_forces} />}
            {analysisData?.strategic_recommendations && <RecommendationsCard recommendations={analysisData.strategic_recommendations} />}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 text-gray-500 text-sm">
            <span>Powered by Business Intelligence Platform</span>
            <span>•</span>
            <span>Real-time Analysis Engine</span>
            <span>•</span>
            <span>Last Updated: {new Date().toLocaleString()}</span>
            {analysisData?.request_id && (
              <>
                <span>•</span>
                <span>Request ID: {analysisData.request_id.slice(-8)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default McKinseyBIDashboard;
