import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine,
} from "recharts";
import Sentiment from "sentiment";
import nlp from "compromise";

const sentimentAnalyser = new Sentiment();

// Score buckets: uses AFINN weighted score (can be negative to strongly positive)
function scoreToBucket(score) {
  if (score >= 3) return "Positive";
  if (score <= -2) return "Negative";
  return "Neutral";
}

function analyzeComments(comments) {
  const nonEmpty = comments.filter((c) => c && c.trim().length > 0);
  if (nonEmpty.length === 0) return null;

  // --- sentiment (AFINN) ---
  const scores = nonEmpty.map((c) => sentimentAnalyser.analyze(c).score);
  const positive = scores.filter((s) => s >= 3).length;
  const negative = scores.filter((s) => s <= -2).length;
  const neutral = nonEmpty.length - positive - negative;
  const avgScore =
    Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;

  // Score distribution for scatter chart (one dot per comment)
  const scoreDistribution = scores.map((score, i) => ({
    index: i + 1,
    score,
    fill: score >= 3 ? "#43a047" : score <= -2 ? "#e53935" : "#ffb300",
  }));

  // --- compromise: noun phrases + key terms ---
  const phraseFreq = {};
  const termFreq = {};

  nonEmpty.forEach((c) => {
    const doc = nlp(c);

    // Noun phrases (e.g. "teaching style", "course material")
    doc
      .nouns()
      .out("array")
      .forEach((phrase) => {
        const key = phrase.toLowerCase().trim();
        if (key.length > 2) phraseFreq[key] = (phraseFreq[key] || 0) + 1;
      });

    // Adjectives and verbs as single terms
    [...doc.adjectives().out("array"), ...doc.verbs().out("array")].forEach(
      (w) => {
        const key = w.toLowerCase().trim();
        if (key.length > 2) termFreq[key] = (termFreq[key] || 0) + 1;
      },
    );
  });

  const topPhrases = Object.entries(phraseFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([phrase, count]) => ({ phrase, count }));

  const topTerms = Object.entries(termFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([word, count]) => ({ word, count }));

  const avgLength = Math.round(
    nonEmpty.reduce((sum, c) => sum + c.trim().length, 0) / nonEmpty.length,
  );

  return {
    nonEmpty: nonEmpty.length,
    avgLength,
    avgScore,
    sentiment: { positive, negative, neutral },
    scoreDistribution,
    topPhrases,
    topTerms,
  };
}

const TONE_DATA = (s) => [
  { label: "Positive", count: s.positive, color: "#43a047" },
  { label: "Neutral", count: s.neutral, color: "#ffb300" },
  { label: "Negative", count: s.negative, color: "#e53935" },
];

const SCORE_COLOR = (score) =>
  score >= 3 ? "#43a047" : score <= -2 ? "#e53935" : "#ffb300";

const CustomScatterDot = (props) => {
  const { cx, cy, payload } = props;
  return (
    <circle cx={cx} cy={cy} r={4} fill={payload.fill} fillOpacity={0.75} />
  );
};

function CommentAnalysis({ comments, header }) {
  const [expanded, setExpanded] = useState(false);
  const analysis = useMemo(() => analyzeComments(comments), [comments]);

  if (!analysis) return null;

  const toneData = TONE_DATA(analysis.sentiment);

  return (
    <div className="card border-info mt-2 mb-3">
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ cursor: "pointer", background: "#e8f4fd" }}
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
        role="button"
        tabIndex="0"
        aria-expanded={expanded}
      >
        <span>
          <span className="me-2">🔍</span>
          <strong>Analysis: {header}</strong>
        </span>
        <span className="text-muted small">
          {expanded ? "▲ Hide" : "▼ Show"}
        </span>
      </div>

      {expanded && (
        <div className="card-body">
          {/* Summary stats row */}
          <div className="row text-center mb-3 g-2">
            <div className="col-3">
              <div className="p-2 bg-light rounded">
                <div className="fs-4 fw-bold text-primary">
                  {analysis.nonEmpty}
                </div>
                <div className="small text-muted">Responses</div>
              </div>
            </div>
            <div className="col-3">
              <div className="p-2 bg-light rounded">
                <div className="fs-4 fw-bold text-success">
                  {analysis.sentiment.positive}
                </div>
                <div className="small text-muted">Positive</div>
              </div>
            </div>
            <div className="col-3">
              <div className="p-2 bg-light rounded">
                <div
                  className="fs-4 fw-bold"
                  style={{ color: SCORE_COLOR(analysis.avgScore) }}
                >
                  {analysis.avgScore > 0 ? "+" : ""}
                  {analysis.avgScore}
                </div>
                <div className="small text-muted">Avg. Score</div>
              </div>
            </div>
            <div className="col-3">
              <div className="p-2 bg-light rounded">
                <div className="fs-4 fw-bold text-secondary">
                  {analysis.avgLength}
                </div>
                <div className="small text-muted">Avg. Length</div>
              </div>
            </div>
          </div>

          {/* Tone Overview */}
          <h6 className="text-muted mb-1">Tone Overview (AFINN)</h6>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart
              data={toneData}
              layout="vertical"
              margin={{ left: 10, right: 50, top: 4, bottom: 4 }}
            >
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={68}
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(v) => [v, "Comments"]} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {toneData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Per-comment score scatter */}
          {analysis.scoreDistribution.length > 1 && (
            <>
              <h6 className="text-muted mt-3 mb-1">
                Sentiment Score per Comment
              </h6>
              <ResponsiveContainer width="100%" height={130}>
                <ScatterChart
                  margin={{ left: 10, right: 20, top: 8, bottom: 4 }}
                >
                  <XAxis
                    type="number"
                    dataKey="index"
                    name="Comment #"
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Comment #",
                      position: "insideBottomRight",
                      offset: -4,
                      fontSize: 10,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="score"
                    name="Score"
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Score",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 10,
                    }}
                  />
                  <ZAxis range={[30, 30]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(v, name) => [v, name]}
                  />
                  <ReferenceLine y={0} stroke="#aaa" strokeDasharray="4 2" />
                  <Scatter
                    data={analysis.scoreDistribution}
                    shape={<CustomScatterDot />}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </>
          )}

          {/* Key phrases (compromise noun phrases) */}
          {analysis.topPhrases.length > 0 && (
            <>
              <h6 className="text-muted mt-3 mb-1">Key Phrases (NLP)</h6>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={analysis.topPhrases}
                  layout="vertical"
                  margin={{ left: 10, right: 40, top: 4, bottom: 4 }}
                >
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="phrase"
                    width={140}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip formatter={(v) => [v, "Mentions"]} />
                  <Bar dataKey="count" fill="#0088FE" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* Top adjectives / verbs */}
          {analysis.topTerms.length > 0 && (
            <>
              <h6 className="text-muted mt-3 mb-1">
                Descriptive Terms (Adj. &amp; Verbs)
              </h6>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart
                  data={analysis.topTerms}
                  margin={{ left: 0, right: 20, bottom: 55, top: 4 }}
                >
                  <XAxis
                    dataKey="word"
                    tick={{ fontSize: 11 }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          <p
            className="text-muted small mt-2 mb-0"
            style={{ fontStyle: "italic" }}
          >
            Sentiment scoring uses the AFINN lexicon. Phrase extraction uses NLP
            (compromise). This analysis is UI-only and is not included in the
            PDF report.
          </p>
        </div>
      )}
    </div>
  );
}

export default CommentAnalysis;
