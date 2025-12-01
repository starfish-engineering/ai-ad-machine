'use client';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Sample data generators
export const generateTimeSeriesData = (days: number = 30) => {
  const data = [];
  const baseValue = 1000;
  let currentValue = baseValue;
  
  for (let i = 0; i < days; i++) {
    currentValue += (Math.random() - 0.45) * 200;
    currentValue = Math.max(currentValue, 100);
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(currentValue),
      previous: Math.round(currentValue * (0.8 + Math.random() * 0.3)),
    });
  }
  return data;
};

export const generateBarData = () => [
  { name: 'Search', value: 4500, fill: 'var(--color-signal-green)' },
  { name: 'Display', value: 3200, fill: 'var(--color-signal-cyan)' },
  { name: 'Shopping', value: 2800, fill: 'var(--color-signal-yellow)' },
  { name: 'Video', value: 1800, fill: 'var(--color-signal-magenta)' },
  { name: 'Social', value: 2400, fill: 'var(--color-signal-orange)' },
];

export const generatePieData = () => [
  { name: 'Google Ads', value: 45, color: 'var(--color-signal-green)' },
  { name: 'Meta Ads', value: 30, color: 'var(--color-signal-cyan)' },
  { name: 'Microsoft', value: 15, color: 'var(--color-signal-yellow)' },
  { name: 'Amazon', value: 10, color: 'var(--color-signal-magenta)' },
];

// Brutalist chart theme
const chartTheme = {
  background: 'transparent',
  textColor: 'var(--color-text-muted)',
  gridColor: 'var(--color-grid)',
  fontSize: 10,
};

interface PerformanceChartProps {
  data?: Array<{ date: string; value: number; previous?: number }>;
  height?: number;
  showPrevious?: boolean;
}

export function PerformanceChart({ data, height = 300, showPrevious = true }: PerformanceChartProps) {
  const chartData = data || generateTimeSeriesData();
  
  return (
    <div className="w-full bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--color-signal-green)] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            PERFORMANCE_TREND
          </span>
        </div>
        <span className="text-[9px] font-mono text-[var(--color-text-dim)]">LAST_30_DAYS</span>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-signal-green)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-signal-green)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-signal-cyan)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--color-signal-cyan)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grid)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="var(--color-text-dim)" 
            fontSize={9} 
            tickLine={false}
            axisLine={{ stroke: 'var(--color-border-harsh)' }}
          />
          <YAxis 
            stroke="var(--color-text-dim)" 
            fontSize={9} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-terminal)',
              border: '2px solid var(--color-border-harsh)',
              borderRadius: 0,
              fontSize: 11,
              fontFamily: 'monospace',
            }}
            labelStyle={{ color: 'var(--color-text-raw)' }}
          />
          {showPrevious && (
            <Area
              type="monotone"
              dataKey="previous"
              stroke="var(--color-signal-cyan)"
              strokeWidth={1}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorPrevious)"
              name="Previous Period"
            />
          )}
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-signal-green)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            name="Current Period"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface SpendBreakdownChartProps {
  data?: Array<{ name: string; value: number; fill: string }>;
  height?: number;
}

export function SpendBreakdownChart({ data, height = 250 }: SpendBreakdownChartProps) {
  const chartData = data || generateBarData();
  
  return (
    <div className="w-full bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-[var(--color-signal-cyan)]" />
        <span className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
          SPEND_BREAKDOWN
        </span>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grid)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="var(--color-text-dim)" 
            fontSize={9}
            tickLine={false}
            axisLine={{ stroke: 'var(--color-border-harsh)' }}
          />
          <YAxis 
            stroke="var(--color-text-dim)" 
            fontSize={9}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-terminal)',
              border: '2px solid var(--color-border-harsh)',
              borderRadius: 0,
              fontSize: 11,
              fontFamily: 'monospace',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PlatformDistributionChartProps {
  data?: Array<{ name: string; value: number; color: string }>;
  height?: number;
}

export function PlatformDistributionChart({ data, height = 250 }: PlatformDistributionChartProps) {
  const chartData = data || generatePieData();
  
  return (
    <div className="w-full bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-[var(--color-signal-magenta)]" />
        <span className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
          PLATFORM_DISTRIBUTION
        </span>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--color-void)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'var(--color-terminal)',
              border: '2px solid var(--color-border-harsh)',
              borderRadius: 0,
              fontSize: 11,
              fontFamily: 'monospace',
            }}
            formatter={(value: number) => [`${value}%`, 'Share']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2 h-2" style={{ background: item.color }} />
            <span className="text-[9px] font-mono text-[var(--color-text-muted)]">{item.name}</span>
            <span className="text-[9px] font-mono font-bold text-[var(--color-text-raw)] ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MetricComparisonChartProps {
  height?: number;
}

export function MetricComparisonChart({ height = 200 }: MetricComparisonChartProps) {
  const data = [
    { metric: 'CTR', current: 4.2, benchmark: 3.5 },
    { metric: 'CVR', current: 2.8, benchmark: 2.2 },
    { metric: 'ROAS', current: 3.5, benchmark: 2.8 },
    { metric: 'QS', current: 7.2, benchmark: 6.0 },
  ];
  
  return (
    <div className="w-full bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-[var(--color-signal-yellow)]" />
        <span className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
          METRICS_VS_BENCHMARK
        </span>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grid)" horizontal={false} />
          <XAxis type="number" stroke="var(--color-text-dim)" fontSize={9} tickLine={false} />
          <YAxis 
            type="category" 
            dataKey="metric" 
            stroke="var(--color-text-dim)" 
            fontSize={9} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-terminal)',
              border: '2px solid var(--color-border-harsh)',
              borderRadius: 0,
              fontSize: 11,
              fontFamily: 'monospace',
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: 9, fontFamily: 'monospace' }}
          />
          <Bar dataKey="benchmark" fill="var(--color-text-dim)" name="Benchmark" barSize={12} />
          <Bar dataKey="current" fill="var(--color-signal-green)" name="Current" barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Mini sparkline for inline use
interface SparklineProps {
  data?: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ 
  data = [10, 15, 8, 20, 14, 25, 18, 30, 22, 28], 
  color = 'var(--color-signal-green)',
  width = 80,
  height = 24 
}: SparklineProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data.map((value, index) => ({ index, value }))}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={1.5} 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

