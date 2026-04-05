import { csvConfig } from "../config/csvConfig";

// ─── Phase 1: keyword-based parsing ─────────────────────────────────────────

export const processCsvData = (csvData) => {
  const headers = csvData[0];
  const dataRows = csvData
    .slice(1)
    .filter((row) => row.some((cell) => cell && cell.trim()));
  const chartHeaders = [];
  const chartData = [];
  const commentHeaders = [];
  const commentData = [];
  const totalFeedback = dataRows.length;

  for (let i = 0; i < headers.length; i++) {
    if (csvConfig.chartKeywords.some((k) => headers[i].includes(k))) {
      chartHeaders.push(headers[i]);
      chartData.push(createChartData(dataRows, i));
    }
    if (csvConfig.commentKeywords.some((k) => headers[i].includes(k))) {
      commentHeaders.push(headers[i]);
      commentData.push(extractComments(dataRows, i));
    }
  }

  return {
    chartHeaders,
    chartData,
    commentHeaders,
    commentData,
    totalFeedback,
  };
};

export const createChartData = (dataRows, columnIndex) => {
  const feedbackCounts = {};
  csvConfig.defaultFeedbackVocabulary.forEach((v) => {
    feedbackCounts[v] = 0;
  });

  for (let i = 0; i < dataRows.length; i++) {
    const feedback = dataRows[i][columnIndex];
    if (Object.prototype.hasOwnProperty.call(feedbackCounts, feedback)) {
      feedbackCounts[feedback]++;
    }
  }

  return Object.entries(feedbackCounts)
    .filter(([, count]) => count > 0)
    .map(([feedback, count]) => ({ feedback, count }));
};

export const extractComments = (dataRows, columnIndex) => {
  const noiseFilters = csvConfig.commentNoiseFilters;
  return dataRows
    .map((row) => row[columnIndex])
    .filter(
      (comment) =>
        comment &&
        comment.trim() &&
        !noiseFilters.includes(comment.trim().toLowerCase()),
    );
};

// ─── Phase 2: mapping-based parsing ─────────────────────────────────────────

export const processCsvDataWithMapping = (csvData, columnMapping) => {
  const dataRows = csvData
    .slice(1)
    .filter((row) => row.some((cell) => cell && cell.trim()));
  const chartHeaders = [];
  const chartData = [];
  const commentHeaders = [];
  const commentData = [];
  const totalFeedback = dataRows.length;

  for (const col of columnMapping) {
    if (col.type === "PIE_CHART") {
      chartHeaders.push(col.header);
      chartData.push(
        createChartDataWithVocab(dataRows, col.index, col.vocabulary),
      );
    } else if (col.type === "COMMENT") {
      commentHeaders.push(col.header);
      commentData.push(
        extractCommentsWithFilters(dataRows, col.index, col.noiseFilters),
      );
    }
  }

  return {
    chartHeaders,
    chartData,
    commentHeaders,
    commentData,
    totalFeedback,
  };
};

export const createChartDataWithVocab = (dataRows, columnIndex, vocabulary) => {
  const feedbackCounts = {};
  vocabulary.forEach((v) => {
    feedbackCounts[v] = 0;
  });

  for (let i = 0; i < dataRows.length; i++) {
    const feedback = dataRows[i][columnIndex];
    if (Object.prototype.hasOwnProperty.call(feedbackCounts, feedback)) {
      feedbackCounts[feedback]++;
    }
  }

  return Object.entries(feedbackCounts)
    .filter(([, count]) => count > 0)
    .map(([feedback, count]) => ({ feedback, count }));
};

export const extractCommentsWithFilters = (
  dataRows,
  columnIndex,
  noiseFilters,
) => {
  return dataRows
    .map((row) => row[columnIndex])
    .filter(
      (comment) =>
        comment &&
        comment.trim() &&
        !noiseFilters.includes(comment.trim().toLowerCase()),
    );
};
