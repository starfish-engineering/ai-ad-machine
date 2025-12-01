'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ZoomIn, ZoomOut, Maximize2, Download, 
  ChevronRight, TrendingDown, TrendingUp, Minus
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Full tree data structure
const treeData = {
  name: 'Click Drop',
  value: '-49%',
  trend: 'down',
  children: [
    {
      name: 'CTR',
      value: '+14%',
      trend: 'up',
      children: [
        {
          name: 'Impression Share',
          value: '-12%',
          trend: 'down',
          children: [
            { name: 'Lost to Budget', value: '+8%', trend: 'up' },
            { name: 'Lost to Rank', value: '+4%', trend: 'up' },
          ],
        },
        {
          name: 'Ad Relevance',
          value: '+5%',
          trend: 'up',
          children: [
            { name: 'Quality Score', value: '+0.3', trend: 'up' },
          ],
        },
      ],
    },
    {
      name: 'Impressions',
      value: '-55%',
      trend: 'down',
      children: [
        {
          name: 'Search Volume',
          value: '-30%',
          trend: 'down',
          children: [
            { name: 'Seasonal Trend', value: '-25%', trend: 'down' },
            { name: 'Market Shift', value: '-5%', trend: 'down' },
          ],
        },
        {
          name: 'Budget',
          value: '-20%',
          trend: 'down',
          children: [
            { name: 'Daily Cap Hit', value: '+45%', trend: 'up' },
            { name: 'Pacing Issues', value: '+12%', trend: 'up' },
          ],
        },
        {
          name: 'Bidding',
          value: '+5%',
          trend: 'up',
          children: [
            { name: 'Target CPA', value: '+$2.50', trend: 'up' },
            { name: 'Max CPC', value: '-$0.80', trend: 'down' },
          ],
        },
      ],
    },
  ],
};

interface TreeNodeData {
  name: string;
  value: string;
  trend: string;
  children?: TreeNodeData[];
}

const TreeNode = ({ 
  node, 
  depth = 0, 
  expanded, 
  onToggle 
}: { 
  node: TreeNodeData; 
  depth?: number;
  expanded: Set<string>;
  onToggle: (name: string) => void;
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.name);
  
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = (trend: string, value: string) => {
    // Determine if change is good or bad based on context
    const isNegative = value.startsWith('-');
    if (trend === 'up') {
      return isNegative ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200';
    }
    if (trend === 'down') {
      return isNegative ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200';
    }
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="relative">
      <div 
        className={`flex items-center gap-2 p-3 rounded-lg border bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow ${depth === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
        onClick={() => hasChildren && onToggle(node.name)}
      >
        {hasChildren && (
          <ChevronRight 
            className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
          />
        )}
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">{node.name}</div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getTrendColor(node.trend, node.value)}`}>
          {getTrendIcon(node.trend)}
          {node.value}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-6 mt-2 space-y-2 relative">
          {/* Connector line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 -ml-3" />
          
          {node.children!.map((child, index) => (
            <div key={child.name} className="relative">
              {/* Horizontal connector */}
              <div className="absolute left-0 top-5 w-3 h-px bg-gray-200 -ml-3" />
              <TreeNode 
                node={child} 
                depth={depth + 1} 
                expanded={expanded}
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function InvestigatorTreePage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['Click Drop', 'Impressions', 'CTR']));
  const [zoom, setZoom] = useState(100);

  const toggleNode = (name: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpanded(newExpanded);
  };

  const expandAll = () => {
    const allNodes = new Set<string>();
    const traverse = (node: TreeNodeData) => {
      allNodes.add(node.name);
      node.children?.forEach(traverse);
    };
    traverse(treeData);
    setExpanded(allNodes);
  };

  const collapseAll = () => {
    setExpanded(new Set(['Click Drop']));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/dashboard/investigator" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Investigator
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Root Cause Analysis Tree</h1>
            <p className="text-gray-600 mt-1">
              Visual breakdown of performance changes and their contributing factors.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge>Nov 1 - Nov 30, 2025</Badge>
            <Badge variant="secondary">vs. Previous Period</Badge>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-2">AI Analysis Summary</h3>
        <p className="text-sm text-gray-700">
          The <strong>49% click drop</strong> is primarily driven by a <strong>55% decrease in impressions</strong>, 
          despite a <strong>14% improvement in CTR</strong>. The impression drop is caused by:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>• <strong>Seasonal search volume decline (-30%)</strong> - typical for this time of year</li>
          <li>• <strong>Budget constraints (-20%)</strong> - daily caps being hit earlier in the day</li>
          <li>• <strong>Impression share lost to budget (+8%)</strong> - consider budget reallocation</li>
        </ul>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(150, zoom + 10))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600 w-12 text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <Button variant="outline" size="sm" onClick={expandAll}>
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
              Collapse All
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4 mr-2" />
              Fullscreen
            </Button>
          </div>
        </div>
      </div>

      {/* Tree View */}
      <div 
        className="bg-white border border-gray-200 rounded-lg p-8 min-h-[500px] overflow-auto"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
      >
        <div className="max-w-3xl">
          <TreeNode node={treeData} expanded={expanded} onToggle={toggleNode} />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-200" />
          <span className="text-gray-600">Positive change</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
          <span className="text-gray-600">Negative change</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-100 border border-amber-200" />
          <span className="text-gray-600">Needs attention</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 border border-blue-500" />
          <span className="text-gray-600">Root metric</span>
        </div>
      </div>
    </div>
  );
}

