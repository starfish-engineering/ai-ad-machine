# Dashboard Screens Specification

## Overview

The authenticated app experience consists of multiple interconnected dashboard screens that provide portfolio-level oversight and account-level deep dives.

## 1. All Accounts Dashboard (Portfolio View)

**URL:** `/dashboard`

**Purpose:** High-level portfolio overview of all connected ad accounts.

### Layout
- Header with scope filters and date range
- Data table with sortable columns
- Pagination controls

### Columns
| Column | Description |
|--------|-------------|
| Account Name | Account identifier with star/favorite toggle |
| Account Health | Green/Yellow/Red indicator |
| Suggestions | Count of pending optimization suggestions |
| Audit Score | 0-100 score with color coding |
| Alerts | Active alert count |
| Tasks | Pending task count |
| Monthly Target Budget | With "Add" button if not set |
| Cost | Total spend in period |
| Impr | Total impressions |
| Clicks | Total clicks |
| Avg CPC | Average cost per click |
| Quality Score | Account-level quality score |
| Conv | Total conversions |
| Cost/Conv | Cost per conversion |
| ROAS | Return on ad spend |

### Features
- Sort by any column
- Search/filter accounts
- Bulk actions
- Export data
- Toggle "View by Portfolio" mode

---

## 2. Account Selector Modal

**Trigger:** Click on account name in header

**Purpose:** Quick switching between accounts

### Layout
- Search input at top
- Dropdown filter: All Accounts / Favorites / By Platform
- Scrollable list of accounts
- Each row shows:
  - Platform icon (Google, Meta, etc.)
  - Account ID
  - Account name
  - Star toggle for favorites

---

## 3. Single Account Dashboard

**URL:** `/dashboard/accounts/[id]`

**Purpose:** Deep-dive dashboard for individual account analysis

### Tabs
1. **Overview** - KPIs, trends, AI insights
2. **Budget** - Budget pacing and projections
3. **Shopping** - Shopping campaign performance (if applicable)

### Overview Tab Components

#### KPI Tiles (Horizontal Strip)
- Impressions (with % change, sparkline)
- Clicks (with % change, sparkline)
- Cost (with % change, sparkline)
- Avg CPC (with % change, sparkline)
- CTR (with % change, sparkline)
- Conversions (with % change, sparkline)
- ROAS (with % change, sparkline)

#### Performance Chart
- Dual-axis line chart
- Metric 1 selector (e.g., Clicks)
- Metric 2 selector (e.g., Cost)
- Date range on X-axis

#### Insights Panel
- Top Elements section
- Account Quality Score visualization

#### AI Assistant (Sidekick) Panel
- AI-generated performance summary
- Quick action buttons:
  - "Tell me three good things about my account"
  - "Quick Performance Summary"
  - "Ask a custom query"

#### PPC Audit Score Card
- Overall score (0-100)
- Category breakdown:
  - Campaigns
  - Performance Max
  - Ad Groups
  - Responsive Search Ads
  - Keywords
  - Performance
- "View All Audits" link
- Previous score comparison

#### Express Optimizations Preview
- List of top suggestions
- "Fix Conflicting Negative Keywords (5)"
- "Fix Ads with Issues (1)"
- Quick action buttons

---

## 4. Sidebar Navigation

### Main Sections

#### Accounts
- All Accounts Dashboard

#### Dashboard
- Account Overview
- Budget View
- Shopping View

#### Monitor
- Alerts Settings
- Triggered Alerts
- KPI Monitoring
- Anomaly Detector

#### Audits & Insights
- PPC Audit
- Account Insights
- PPC Investigator

#### Manage & Optimize
- Search Queries
- Keywords
- Ads & Creatives
- Bidding
- Budgets
- Placements

#### Shopping
- Product Feed
- Shopping Campaigns
- Inventory Sync

#### Workflows
- Rule Engine
- Scheduled Tasks
- Automation History

#### Reports
- Report Builder
- Scheduled Reports
- Templates

#### Utilities
- Scripts
- Bulk Operations
- Data Export

---

## 5. Alerts Management

**URL:** `/dashboard/alerts`

**Purpose:** Configure and manage all alert rules

### Layout
- Filter bar: Platform, Accounts, Alert Type, Level, Status
- Data table with columns:
  - Account
  - Alert Type
  - Alert Level
  - Target Value
  - Deviation Allowed
  - Alert Owner
  - Tracking Status
  - Users Notified
  - Actions

### Alert Types
- Anomaly - Impressions
- Anomaly - Clicks
- Anomaly - Cost
- KPI - ROAS
- KPI - CPA
- KPI - CTR
- Budget - Overspend
- Budget - Underspend

### Actions
- Create New KPI Alert
- Create New Budget Alert
- Edit/Delete existing
- Bulk actions

---

## 6. PPC Investigator

**URL:** `/dashboard/investigator`

**Purpose:** Root cause analysis for performance changes

### Layout
- Question builder: "Why did [Metric] change during [Period] compared to [Comparison]?"
- Campaign/Network/Device filters
- Cause Chart (tree diagram)
- Root Cause Analysis table

### Tree Visualization
- Top node: Primary metric change (e.g., Clicks -48.62%)
- Child nodes: Contributing factors
  - CTR changes
  - Avg CPC changes
  - Impression changes
- Color coding:
  - Red: Negative impact
  - Green: Positive impact
  - Gray: No change

### AI Summary
- Natural language explanation of root causes
- Recommended actions

---

## 7. Express Optimizations

**URL:** `/dashboard/express`

**Purpose:** One-click optimization suggestions

### Layout
- Left panel: Suggestion list
  - Grouped by account
  - Filterable by type
  - Shows count per suggestion
- Right panel: Suggestion detail
  - Description
  - Affected items table
  - Action buttons

### Suggestion Types
- Fix Conflicting Negative Keywords
- Fix Impression Share Lost to Budget
- Add New Keywords
- Fix Ads with Issues
- Optimize Bids
- Pause Low Performers

### Actions per Suggestion
- Apply (one-click fix)
- Snooze (hide temporarily)
- Dismiss (ignore)
- View Details

---

## 8. Component Library Needs

### New Components Required
- `DataTable` - Sortable, filterable data table
- `KPICard` - Metric tile with sparkline
- `TreeChart` - Hierarchical cause visualization
- `AccountSelector` - Modal for account switching
- `SidebarNav` - Collapsible navigation
- `AlertBadge` - Status indicators
- `AuditScore` - Circular score display
- `SparklineChart` - Mini inline charts
- `DateRangePicker` - Date selection
- `MetricComparison` - Before/after metrics

