import { useState } from 'react';
import { Search, FileSpreadsheet, User, Mail, Hash, ArrowRight, Building, Globe, Phone } from 'lucide-react';

// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Abstract Management Platform</title>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

export default function AbstractManagementPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('abstract');
  const [abstracts, setAbstracts] = useState([
    {
      id: 'ABS001',
      // Section A
      submissionStatus: {
        presentationType: 'Oral Presentation',
        category: 'Clinical Research',
        topic: 'Oncology',
        abstractTitle: 'Novel Approaches in Cancer Treatment'
      },
      // Section B
      institutionInfo: {
        institutionNumber: '001',
        affiliation: 'Medical Research Center, University Hospital'
      },
      // Section C
      authors: [
        {
          order: 1,
          firstName: 'Jane',
          lastName: 'Smith',
          institutionNo: '001',
          isPresentingAuthor: true,
          isCorrespondingAuthor: true
        },
        {
          order: 2,
          firstName: 'John',
          lastName: 'Doe',
          institutionNo: '002',
          isPresentingAuthor: false,
          isCorrespondingAuthor: false
        }
      ],
      // Section D
      presentingAuthor: {
        name: 'Jane Smith',
        institutionNo: '001',
        country: 'United States',
        email: 'jane.smith@medical.org',
        mobile: '+1-234-567-8900'
      },
      correspondingAuthor: {
        name: 'Jane Smith',
        institutionNo: '001',
        country: 'United States',
        email: 'jane.smith@medical.org',
        mobile: '+1-234-567-8900'
      },
      // Section E
      abstractInfo: {
        objectives: 'To evaluate the efficacy of novel treatment approaches...',
        methods: 'A randomized controlled trial was conducted...',
        results: 'The study demonstrated significant improvement...',
        conclusion: 'These findings suggest that the novel approach...'
      }
    },
    // Add more sample data as needed
  ]);
  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowDetails(false);
  };

  const filteredAbstracts = abstracts.filter((abstract) => {
    const searchLower = searchQuery.toLowerCase();
    switch (searchType) {
      case 'abstract':
        return abstract.submissionStatus.abstractTitle.toLowerCase().includes(searchLower);
      case 'name':
        return abstract.authors.some(author => `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchLower));
      case 'email':
        return abstract.presentingAuthor.email.toLowerCase().includes(searchLower) || abstract.correspondingAuthor.email.toLowerCase().includes(searchLower);
      case 'registration':
        return abstract.id.toLowerCase().includes(searchLower);
      default:
        return false;
    }
  });

  const handleAbstractClick = (abstract) => {
    setSelectedAbstract(abstract);
    setShowDetails(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Here you would implement the Excel file processing
      // You can use libraries like xlsx or parse-xlsx
      console.log('File uploaded:', file.name);
    }
  };

  const DetailSection = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">{title}</h3>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="mb-3">
      <span className="font-medium text-gray-700">{label}: </span>
      <span className="text-gray-600">{value}</span>
    </div>
  );

  const AbstractDetails = ({ abstract }) => (
    <div className="space-y-8">
      <DetailSection title="Section A. Abstract Submission Status">
        <InfoRow label="Preferred Presentation Type" value={abstract.submissionStatus.presentationType} />
        <InfoRow label="Category" value={abstract.submissionStatus.category} />
        <InfoRow label="Topic" value={abstract.submissionStatus.topic} />
        <InfoRow label="Abstract Title" value={abstract.submissionStatus.abstractTitle} />
      </DetailSection>

      <DetailSection title="Section B. Author Information">
        <InfoRow label="Institution Number" value={abstract.institutionInfo.institutionNumber} />
        <InfoRow label="Affiliation" value={abstract.institutionInfo.affiliation} />
      </DetailSection>

      <DetailSection title={`Section C. Authors Order (Total: ${abstract.authors.length})`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">No.</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">First Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Last Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Institution No.</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Presenting</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Corresponding</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {abstract.authors.map((author) => (
                <tr key={author.order}>
                  <td className="px-4 py-2">{author.order}</td>
                  <td className="px-4 py-2">{author.firstName}</td>
                  <td className="px-4 py-2">{author.lastName}</td>
                  <td className="px-4 py-2">{author.institutionNo}</td>
                  <td className="px-4 py-2">{author.isPresentingAuthor ? '✓' : ''}</td>
                  <td className="px-4 py-2">{author.isCorrespondingAuthor ? '✓' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DetailSection>

      <DetailSection title="Section D. Author Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Presenting Author</h4>
            <InfoRow label="Name" value={abstract.presentingAuthor.name} />
            <InfoRow label="Institution No." value={abstract.presentingAuthor.institutionNo} />
            <InfoRow label="Country" value={abstract.presentingAuthor.country} />
            <InfoRow label="Email" value={abstract.presentingAuthor.email} />
            <InfoRow label="Mobile" value={abstract.presentingAuthor.mobile} />
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Corresponding Author</h4>
            <InfoRow label="Name" value={abstract.correspondingAuthor.name} />
            <InfoRow label="Institution No." value={abstract.correspondingAuthor.institutionNo} />
            <InfoRow label="Country" value={abstract.correspondingAuthor.country} />
            <InfoRow label="Email" value={abstract.correspondingAuthor.email} />
            <InfoRow label="Mobile" value={abstract.correspondingAuthor.mobile} />
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Section E. Abstract Information">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Objectives</h4>
            <p className="text-gray-600">{abstract.abstractInfo.objectives}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Methods</h4>
            <p className="text-gray-600">{abstract.abstractInfo.methods}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Results</h4>
            <p className="text-gray-600">{abstract.abstractInfo.results}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Conclusion</h4>
            <p className="text-gray-600">{abstract.abstractInfo.conclusion}</p>
          </div>
        </div>
      </DetailSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {!showDetails ? (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Abstract Management Platform</h1>
          
          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search abstracts..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="abstract">Abstract Title</option>
                <option value="name">Author Name</option>
                <option value="email">Email</option>
                <option value="registration">Abstract ID</option>
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Import Excel Data
              </label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {filteredAbstracts.map((abstract) => (
                <div
                  key={abstract.id}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => handleAbstractClick(abstract)}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{abstract.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{abstract.authors.find(author => author.isPresentingAuthor).firstName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{abstract.presentingAuthor.email}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={() => setShowDetails(false)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            ← Back to Search
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Abstract Details</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  // Export functionality implementation
                  console.log('Exporting to Excel:', selectedAbstract);
                }}
              >
                <FileSpreadsheet className="h-5 w-5" />
                Export to Excel
              </button>
            </div>
            
            {selectedAbstract && <AbstractDetails abstract={selectedAbstract} />}
          </div>
        </div>
      )}
    </div>
  );
}
