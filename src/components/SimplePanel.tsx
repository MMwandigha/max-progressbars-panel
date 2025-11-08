import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
// import { css, cx } from '@emotion/css';
// import { useStyles2, useTheme2 } from '@grafana/ui';
// import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const {
    title = '🎯 Top Support Needs for Climate Adaptation',
    subtitle = 'What help do communities need most to adapt to weather changes?',
    fieldCategory,
    fieldMentionsPercent,
    fieldMentionsCount,
    fieldKeywords,
    barColor = '#2f855a',
  } = options;

  // Handle no data case
  if (!data.series.length) {
    return <div style={{ padding: 12 }}>No data to display</div>;
  }

  // Use the first series (Grafana data frame)
  const frame = data.series[0];

  // Extract rows
  const rows = Array.from({ length: frame.length || frame.fields[0].values.length }, (_, i) => {
    const get = (field?: string) => {
      const f = field ? frame.fields.find(f => f.name === field) : undefined;
      return f ? f.values.get(i) : undefined;
    };

    let keywords = get(fieldKeywords);

    if (typeof keywords === 'string') {
      try {
        const parsed = JSON.parse(keywords);
        if (Array.isArray(parsed)) {
          keywords = parsed;
        }
      } catch {
        // if not valid json, leave it as is
      }
    }
    return {
      category: get(fieldCategory),
      mentionsPercent: get(fieldMentionsPercent),
      mentionsCount: get(fieldMentionsCount),
      keywords,
    };
  });

  // Responsive scaling
  const fontScale = Math.max(0.8, Math.min(width / 600, 1.2));
  const isNarrow = width < 300;

  return (
    <div
      style={{
        width,
        height,
        padding: 12 * fontScale,
        fontFamily: 'Inter, sans-serif',
        overflowY: 'auto',
      }}
    >
      <h2
        style={{
          fontSize: `clamp(16px, ${2 * fontScale}vw, 20px)`,
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        {title}
      </h2>

      <div
        style={{
          fontSize: 14 * fontScale,
          color: '#555',
          marginBottom: 20 * fontScale,
        }}
      >
        {subtitle}
      </div>

      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ddd',
            borderRadius: 12,
            padding: 16 * fontScale,
            marginBottom: 12 * fontScale,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            background: 'white',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18 * fontScale,
              fontWeight: 600,
            }}
          >
            {i + 1}. {row.category}
          </h3>

          <div
            style={{
              marginBottom: 8 * fontScale,
              fontSize: 14 * fontScale,
              fontWeight: 500,
              display: 'flex',
              flexDirection: isNarrow ? 'column' : 'row',
              justifyContent: 'space-between',
            }}
          >
            <div>Community Mentions:</div>
            <div>
              {Number(row.mentionsPercent).toFixed(1)}% ({row.mentionsCount} posts)
            </div>
          </div>

          <div
            style={{
              background: '#f0f4f8',
              borderRadius: 6,
              overflow: 'hidden',
              height: 8 * fontScale,
              marginBottom: 12 * fontScale,
            }}
          >
            <div
              style={{
                background: barColor,
                height: '100%',
                width: `${row.mentionsPercent}%`,
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 12 * fontScale,
              color: '#444',
              wordWrap: 'break-word',
            }}
          >
            <strong>Keywords:</strong>{' '}
            {Array.isArray(row.keywords)
              ? row.keywords.join(', ')
              : row.keywords}
          </p>
        </div>
      ))}
    </div>
  );
};
