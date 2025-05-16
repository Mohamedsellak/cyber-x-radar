"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaKey, FaCode, FaCheck, FaCopy, FaShieldAlt, FaExclamationTriangle, FaSkull, FaHome, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function ApiDocumentation() {
  const [activeSample, setActiveSample] = useState('curl');
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});
  const [activeSection, setActiveSection] = useState('getting-started');
  
  const apiUrl = 'https://scan.cyberxradar.com/server/api/getDomainStatistics.php';
  
  // Updated sample response to match the actual API response for Dark Web monitoring
  const sampleResponses = {
    success: `{
  "status": "success",
  "domain": "example.com",
  "scan_date": "2023-11-20 14:32:15",
  "data": {
    "Severity": "High",
    "malwareLogs": "Found",
    "publicBreaches": "Found",
    "darkwebMentions": "260",
    "compromisedEmployees": "506",
    "compromisedUsers": "2511",
    "lastMention": "This week",
    "asnsCount": "10"
  }
}`,
    error: `{
  "status": "error",
  "message": "Invalid API token",
  "code": 401
}`
  };

  // Expanded code examples to include more languages
  const requestSamples = {
    curl: `curl -X GET "${apiUrl}?domain=example.com&token=YOUR_API_TOKEN"`,
    javascript: `fetch("${apiUrl}?domain=example.com&token=YOUR_API_TOKEN")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    python: `import requests

response = requests.get("${apiUrl}", params={
    "domain": "example.com",
    "token": "YOUR_API_TOKEN"
})

data = response.json()
print(data)`,
    php: `<?php
$url = "${apiUrl}?domain=example.com&token=YOUR_API_TOKEN";
$response = file_get_contents($url);
$data = json_decode($response, true);
print_r($data);
?>`,
    ruby: `require 'net/http'
require 'json'

uri = URI("${apiUrl}")
params = { domain: "example.com", token: "YOUR_API_TOKEN" }
uri.query = URI.encode_www_form(params)

response = Net::HTTP.get_response(uri)
data = JSON.parse(response.body)

puts data`,
    csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using (var client = new HttpClient())
        {
            var response = await client.GetStringAsync("${apiUrl}?domain=example.com&token=YOUR_API_TOKEN");
            Console.WriteLine(response);
        }
    }
}`,
    java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${apiUrl}?domain=example.com&token=YOUR_API_TOKEN"))
                .build();
                
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied({...copied, [key]: true});
    setTimeout(() => {
      setCopied({...copied, [key]: false});
    }, 2000);
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'getting-started',
        'authentication',
        'endpoints',
        'response',
        'examples',
        'rate-limits',
        'contact'
      ];
      
      const sectionElements = sections.map(id => 
        document.getElementById(id)
      ).filter(Boolean);
      
      // Find the section that is currently in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const endpoints = [
    {
      name: "Dark Web Monitoring",
      endpoint: "/server/api/getDomainStatistics.php",
      method: "GET",
      description: "Retrieve comprehensive dark web and breach statistics for a specific domain.",
      parameters: [
        { name: "domain", required: true, type: "string", description: "The domain name to scan (e.g., example.com)" },
        { name: "token", required: true, type: "string", description: "Your API authentication token" }
      ]
    }
  ];

  // Navigation links for sidebar
  const navLinks = [
    { id: 'getting-started', label: 'Getting Started', icon: <FaCode className="w-4 h-4" /> },
    { id: 'authentication', label: 'Authentication', icon: <FaKey className="w-4 h-4" /> },
    { id: 'endpoints', label: 'API Endpoints', icon: <FaSkull className="w-4 h-4" /> },
    { id: 'response', label: 'Response Format', icon: <FaShieldAlt className="w-4 h-4" /> },
    { id: 'examples', label: 'Code Examples', icon: <FaCode className="w-4 h-4" /> },
    { id: 'rate-limits', label: 'Rate Limits', icon: <FaExclamationTriangle className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Support', icon: <FaCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1F] to-[#121221] text-gray-100 pb-16">
      {/* Back to Home Button - Fixed Position */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-blue-900/80 hover:bg-blue-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-900/40 border border-blue-700/50 backdrop-blur-sm group">
          <FaChevronLeft className="transition-transform group-hover:-translate-x-1" />
          <FaHome className="text-blue-300" />
          <span>Back to Home</span>
        </Link>
      </div>
      
      {/* Hero Section - Updated for Dark Web focus */}
      <div className="relative bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-b border-indigo-900/50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 pb-2">
                Cyber X Radar API
              </h1>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl">
                Integrate our powerful dark web monitoring and domain security scanning capabilities directly into your applications.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href="#getting-started" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center gap-2 transform hover:translate-y-[-2px] shadow-lg hover:shadow-blue-600/30"
                >
                  <FaCode />
                  Get Started
                </a>
                <a 
                  href="#contact" 
                  className="bg-indigo-900/50 text-white px-6 py-3 rounded-lg font-medium border border-indigo-700/50 hover:bg-indigo-800/50 transition-colors flex items-center gap-2 transform hover:translate-y-[-2px] shadow-lg hover:shadow-indigo-600/20"
                >
                  <FaKey />
                  Request API Access
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced background with animated glow */}
        <motion.div
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-2/3 bg-blue-600/20 rounded-full filter blur-[100px]"
        />

        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.1]"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Enhanced navigation card with glass effect */}
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-4 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mb-4">
                  Documentation
                </h3>
                <nav className="space-y-1">
                  {navLinks.map(link => (
                    <a 
                      key={link.id}
                      href={`#${link.id}`} 
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                        activeSection === link.id 
                          ? 'bg-blue-900/40 text-blue-300 font-medium border border-blue-800/50 shadow-sm' 
                          : 'text-gray-300 hover:bg-indigo-900/30 hover:text-blue-400 transition-all duration-200'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
              
              {/* Resource links card */}
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-4 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mb-4">
                  Resources
                </h3>
                <div className="space-y-2">
                  <a href="/contact" className="flex items-center gap-2 text-gray-300 hover:text-blue-300 transition-colors py-2">
                    <FaShieldAlt className="text-blue-500" />
                    <span>Request Enterprise Plan</span>
                  </a>
                  <a href="/contact" className="flex items-center gap-2 text-gray-300 hover:text-blue-300 transition-colors py-2">
                    <FaExclamationTriangle className="text-amber-400" />
                    <span>Report API Issues</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - with enhanced styling */}
          <div className="lg:col-span-3 space-y-16">
            {/* Getting Started - Updated for Dark Web focus */}
            <section id="getting-started" className="scroll-mt-16">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 flex items-center gap-3">
                <FaCode className="text-blue-400" />
                Getting Started
              </h2>
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-6 backdrop-blur-sm hover:shadow-blue-900/10 transition-all duration-300">
                <p className="text-gray-300 mb-4">
                  The Cyber X Radar API provides programmatic access to our powerful dark web monitoring and domain security scanning engine. 
                  With our API, you can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                  <li>Monitor domains for dark web exposure</li>
                  <li>Check for leaked credentials and breached data</li>
                  <li>Discover compromised employees and users</li>
                  <li>Track dark web mentions of your domain</li>
                  <li>Analyze public breaches affecting your organization</li>
                  <li>Integrate security monitoring into your applications</li>
                </ul>
                <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-900/30 flex items-start gap-3">
                  <FaExclamationTriangle className="text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-300">
                    To use the Cyber X Radar API, you need an API token. Tokens are provided to registered users only.
                    <a href="#contact" className="text-blue-400 hover:text-blue-300 ml-1">
                      Contact us to request access
                    </a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-16">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 flex items-center gap-3">
                <FaKey className="text-blue-400" />
                Authentication
              </h2>
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-6 backdrop-blur-sm hover:shadow-blue-900/10 transition-all duration-300">
                <p className="text-gray-300 mb-4">
                  All API requests require authentication using an API token.
                  Include your token as a query parameter in every request.
                </p>
                <div className="bg-[#121232] rounded-lg p-4 font-mono text-sm overflow-x-auto border border-indigo-900/30 mb-4">
                  <code className="text-gray-300">
                    {apiUrl}<span className="text-amber-400">?domain=example.com&token=YOUR_API_TOKEN</span>
                  </code>
                </div>
                <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-900/30 flex items-start gap-3">
                  <FaShieldAlt className="text-blue-400 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-300">
                    Keep your API token secure. Do not expose it in client-side code or public repositories.
                  </p>
                </div>
              </div>
            </section>

            {/* API Endpoints - Updated for Dark Web focus */}
            <section id="endpoints" className="scroll-mt-16">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 flex items-center gap-3">
                <FaSkull className="text-red-400" />
                API Endpoints
              </h2>
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden backdrop-blur-sm hover:shadow-blue-900/10 transition-all duration-300">
                {endpoints.map((endpoint, index) => (
                  <div 
                    key={index} 
                    className={`p-6 ${index !== 0 ? 'border-t border-indigo-900/30' : ''}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-2">
                        <FaSkull className="text-red-400 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{endpoint.name}</h3>
                          <p className="text-gray-400 text-sm mb-2">{endpoint.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg border border-blue-800/50 text-sm font-mono">
                          {endpoint.method}
                        </span>
                        <span className="ml-2 text-sm font-mono text-gray-400">
                          {endpoint.endpoint}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Parameters</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-indigo-900/30 rounded-lg overflow-hidden">
                          <thead className="bg-[#121232]">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Required
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-indigo-900/30">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <tr key={paramIndex} className="bg-[#121232]/50">
                                <td className="px-4 py-3 text-sm text-white font-mono">
                                  {param.name}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-300">
                                  {param.type}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {param.required ? (
                                    <span className="text-amber-400">Yes</span>
                                  ) : (
                                    <span className="text-gray-400">No</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-300">
                                  {param.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Response Format - Updated with the actual Dark Web monitoring response */}
            <section id="response" className="scroll-mt-16">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 flex items-center gap-3">
                <FaShieldAlt className="text-blue-400" />
                Response Format
              </h2>
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-6 backdrop-blur-sm hover:shadow-blue-900/10 transition-all duration-300">
                <p className="text-gray-300 mb-6">
                  The API returns responses in JSON format. Each response includes a <code className="text-amber-400">status</code> field that indicates whether the request was successful.
                </p>
                
                <h3 className="text-lg font-semibold text-white mb-4">Understanding the Response Fields</h3>
                <div className="mb-6 overflow-x-auto">
                  <table className="min-w-full border border-indigo-900/30 rounded-lg overflow-hidden">
                    <thead className="bg-[#121232]">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Field
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-900/30">
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">Severity</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Overall risk level based on findings (High, Medium, Low)
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">malwareLogs</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Indicates if malware logs were found associated with the domain
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">publicBreaches</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Indicates if the domain was found in public breach databases
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">darkwebMentions</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Number of times the domain was mentioned on dark web forums and marketplaces
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">compromisedEmployees</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Number of employees with leaked credentials associated with the domain
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">compromisedUsers</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Total number of users affected by breaches related to the domain
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">lastMention</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Timeframe of the most recent mention on the dark web
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">asnsCount</td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Number of Autonomous System Numbers associated with the domain
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-4">Successful Response Example</h3>
                <div className="relative bg-[#121232] rounded-lg overflow-hidden mb-8">
                  <div className="absolute right-2 top-2">
                    <button 
                      onClick={() => copyToClipboard(sampleResponses.success, 'success')}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied.success ? <FaCheck /> : <FaCopy />}
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono">
                    {sampleResponses.success}
                  </pre>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-4">Error Response Example</h3>
                <div className="relative bg-[#121232] rounded-lg overflow-hidden">
                  <div className="absolute right-2 top-2">
                    <button 
                      onClick={() => copyToClipboard(sampleResponses.error, 'error')}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied.error ? <FaCheck /> : <FaCopy />}
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono">
                    {sampleResponses.error}
                  </pre>
                </div>
              </div>
            </section>

            {/* Code Examples - Updated with more language options */}
            <section id="examples" className="scroll-mt-16">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 flex items-center gap-3">
                <FaCode className="text-blue-400" />
                Code Examples
              </h2>
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-6 backdrop-blur-sm hover:shadow-blue-900/10 transition-all duration-300">
                <div className="mb-6">
                  <div className="flex flex-wrap border-b border-indigo-900/30">
                    {Object.keys(requestSamples).map((key) => (
                      <button
                        key={key}
                        className={`px-4 py-2 ${
                          activeSample === key
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-400 hover:text-gray-300'
                        } transition-colors`}
                        onClick={() => setActiveSample(key)}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="relative bg-[#121232] rounded-lg overflow-hidden">
                  <div className="absolute right-2 top-2">
                    <button 
                      onClick={() => copyToClipboard(requestSamples[activeSample as keyof typeof requestSamples], activeSample)}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied[activeSample] ? <FaCheck /> : <FaCopy />}
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono">
                    {requestSamples[activeSample as keyof typeof requestSamples]}
                  </pre>
                </div>
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="scroll-mt-16">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 flex items-center gap-3">
                <FaExclamationTriangle className="text-amber-400" />
                Rate Limits
              </h2>
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-6 backdrop-blur-sm hover:shadow-blue-900/10 transition-all duration-300">
                <p className="text-gray-300 mb-4">
                  To ensure service stability, API requests are subject to rate limiting.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-indigo-900/30 rounded-lg overflow-hidden">
                    <thead className="bg-[#121232]">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Rate Limit
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Burst Limit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-900/30">
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Basic
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          100 requests / day
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          5 requests / minute
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Professional
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          1,000 requests / day
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          20 requests / minute
                        </td>
                      </tr>
                      <tr className="bg-[#121232]/50">
                        <td className="px-4 py-3 text-sm text-gray-300">
                          Enterprise
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          10,000 requests / day
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          100 requests / minute
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Contact Support */}
            <section id="contact" className="scroll-mt-16">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 flex items-center gap-3">
                <FaCheck className="text-green-400" />
                Contact Support
              </h2>
              <div className="bg-[#1A1A3A]/80 rounded-xl border border-indigo-900/50 shadow-lg p-6 backdrop-blur-sm hover:shadow-blue-900/10 transition-all duration-300">
                <p className="text-gray-300 mb-6">
                  Need help with the API or want to request access? Our team is here to assist you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#121232]/50 p-5 rounded-lg border border-indigo-900/30">
                    <h3 className="text-lg font-semibold text-white mb-3">Request API Access</h3>
                    <p className="text-gray-400 mb-4">Fill out our form to request an API token for your project.</p>
                    <a 
                      href="/contact" 
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
                    >
                      Request Access
                    </a>
                  </div>
                  <div className="bg-[#121232]/50 p-5 rounded-lg border border-indigo-900/30">
                    <h3 className="text-lg font-semibold text-white mb-3">Technical Support</h3>
                    <p className="text-gray-400 mb-4">Need help integrating our API? Our engineers are ready to help.</p>
                    <a 
                      href="mailto:api-support@cyberxradar.com" 
                      className="inline-block bg-indigo-900/70 text-white px-4 py-2 rounded-lg font-medium border border-indigo-700/50 hover:bg-indigo-800 transition-colors"
                    >
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* Footer with back to top button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <a 
          href="#" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-900/40 hover:bg-indigo-800/50 rounded-lg text-gray-300 hover:text-white transition-all duration-300 border border-indigo-800/30"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to Top
        </a>
      </div>
    </div>
  );
}
