import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
// import { css, cx } from '@emotion/css';
// import { useStyles2, useTheme2 } from '@grafana/ui';
// import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const {
    title,
    subtitle,
    fieldCategory,
    fieldDescription,
    fieldMentionsPercent,
    fieldMentionsCount,
    fieldKeywords,
    barColor,
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
      description: get(fieldDescription),
      mentionsPercent: get(fieldMentionsPercent),
      mentionsCount: get(fieldMentionsCount),
      keywords,
    };
  });

  return (
    <div
      style={{
        width,
        height,
        padding: 12,
        overflowY: 'auto',
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 8,
          overflowWrap: 'break-word',
        }}
      >
        {title}
      </h2>

      <h3
        style={{
          fontSize: 14,
          color: '#555',
          marginBottom: 12,
          overflowWrap: 'break-word',
        }}
      >
        {subtitle}
      </h3>

      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ddd',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            background: 'white',
          }}
        >
      <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 'bold',
              overflowWrap: 'break-word',
            }}
          >
            {options.showNumbering ? `${i + 1}. ` : ''}{row.category}
          </h3>

          <p
            style={{
              margin: '6px 0 12px',
              fontSize: 14,
              color: '#666',
              overflowWrap: 'break-word',
            }}
          >
            {row.description}
          </p>

          <div
            style={{
              marginBottom: 8,
              marginTop: 8,
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              flexDirection: width < 300 ? 'column' : 'row',
              justifyContent: 'space-between',
            }}
          >
            <div>Community Mentions:</div>
            <div>
              {Number(row.mentionsPercent).toFixed(options.decimalPlaces ?? 1)}%
              {' '}({row.mentionsCount} posts)
            </div>
          </div>

          <div
            style={{
              background: '#f0f4f8',
              borderRadius: 6,
              overflow: 'hidden',
              height: 8,
              marginBottom: 12,
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
              fontSize: 12,
              color: '#444',
              wordWrap: 'break-word',
            }}
          >
            <strong>Keywords: </strong>
            {Array.isArray(row.keywords)
              ? row.keywords.join(', ')
              : row.keywords}
          </p>
        </div>
      ))}
    </div>
  );
};
