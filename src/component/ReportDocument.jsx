import React from "react";
import {
  Document,
  Font,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { getReportConfig } from "../config/reportConfig";
import { interpolateTitle, sanitizePdfText } from "../utils/reportHelpers";

// Emoji are rendered as inline Twemoji PNG images so they work with the
// standard Helvetica font. No custom font files are needed.
Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginVertical: 6,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  metaCell: {
    width: "100%",
    marginBottom: 4,
  },
  chartBlock: {
    width: "100%",
    marginBottom: 12,
  },
  chartImage: {
    width: "100%",
    height: 300,
    objectFit: "contain",
  },
  commentHeader: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  commentItem: {
    flex: 1,
    marginBottom: 3,
    fontSize: 10,
  },
  commentBullet: {
    width: 14,
    fontSize: 10,
    marginTop: 0,
  },
  commentRow: {
    flexDirection: "row",
    marginBottom: 3,
    marginLeft: 6,
  },
});

function TitleBlock({
  courseName,
  moduleName,
  faculty,
  batchMonth,
  batchYear,
  moduleco,
  totalCount,
  config,
}) {
  const title = sanitizePdfText(
    interpolateTitle(config.titleTemplate, {
      courseName,
      moduleName,
      faculty,
      batchMonth,
      batchYear,
      moduleco,
    }),
  );

  return (
    <View style={{ marginBottom: 6 }}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.hr} />
      <Text style={styles.metaCell}>
        Module Name: {sanitizePdfText(moduleName)}
      </Text>
      {batchMonth || batchYear ? (
        <Text style={styles.metaCell}>
          Batch: {sanitizePdfText(batchMonth)} {sanitizePdfText(batchYear)}
        </Text>
      ) : null}
      {faculty && faculty.trim() ? (
        <Text style={styles.metaCell}>
          Faculty Name: {sanitizePdfText(faculty)}
        </Text>
      ) : null}
      {moduleco && moduleco.trim() ? (
        <Text style={styles.metaCell}>
          Module Coordinator: {sanitizePdfText(moduleco)}
        </Text>
      ) : null}
      <Text style={styles.metaCell}>Total Feedback Count: {totalCount}</Text>
      <View style={styles.hr} />
    </View>
  );
}

function ReportDocument({
  courseName,
  moduleName,
  faculty,
  batchMonth,
  batchYear,
  moduleco,
  totalCount,
  chartImages,
  commentData,
  commentHeaders,
  config: configProp,
}) {
  const config = configProp ?? getReportConfig();
  // Group charts into pairs for layout (2 per page)
  const chartPairs = [];
  for (let i = 0; i < chartImages.length; i += 2) {
    chartPairs.push(chartImages.slice(i, i + 2));
  }

  const renderCommentPages = () =>
    commentData.map((comments, i) => (
      <Page
        key={`com-${i}`}
        size={config.pageSize}
        orientation={config.pageOrientation}
        style={styles.page}
      >
        <Text style={styles.commentHeader}>
          {sanitizePdfText(commentHeaders[i] ?? "")}
        </Text>
        {comments.map((c, ci) => (
          <View key={ci} style={styles.commentRow} wrap={false}>
            <Text style={styles.commentBullet}>{"\u2022"}</Text>
            <Text style={styles.commentItem}>{sanitizePdfText(c)}</Text>
          </View>
        ))}
      </Page>
    ));

  const chartOnlyPages = chartPairs.slice(1).map((pair, pi) => (
    <Page
      key={`cp-${pi}`}
      size={config.pageSize}
      orientation={config.pageOrientation}
      style={styles.page}
    >
      {pair.map((imgSrc, j) => (
        <View key={j} style={styles.chartBlock} wrap={false}>
          <Image style={styles.chartImage} src={imgSrc} />
        </View>
      ))}
    </Page>
  ));

  // Build page sequence respecting sectionOrder
  const sections = config.sectionOrder ?? ["charts", "comments"];
  const hasCharts = sections.includes("charts");
  const hasComments = sections.includes("comments");
  const chartsFirst =
    hasCharts && hasComments
      ? sections.indexOf("charts") < sections.indexOf("comments")
      : hasCharts;

  return (
    <Document>
      {/* Page 1: title block + first pair of charts (if charts come first) */}
      <Page
        size={config.pageSize}
        orientation={config.pageOrientation}
        style={styles.page}
      >
        <TitleBlock
          courseName={courseName}
          moduleName={moduleName}
          faculty={faculty}
          batchMonth={batchMonth}
          batchYear={batchYear}
          moduleco={moduleco}
          totalCount={totalCount}
          config={config}
        />
        {chartsFirst &&
          chartPairs[0]?.map((imgSrc, j) => (
            <View key={j} style={styles.chartBlock} wrap={false}>
              <Image style={styles.chartImage} src={imgSrc} />
            </View>
          ))}
        {!chartsFirst && commentData[0] !== undefined && (
          <>
            <Text style={styles.commentHeader}>
              {sanitizePdfText(commentHeaders[0] ?? "")}
            </Text>
            {commentData[0].map((c, ci) => (
              <View key={ci} style={styles.commentRow} wrap={false}>
                <Text style={styles.commentBullet}>{"\u2022"}</Text>
                <Text style={styles.commentItem}>{sanitizePdfText(c)}</Text>
              </View>
            ))}
          </>
        )}
      </Page>

      {/* Remaining pages in section order */}
      {chartsFirst ? (
        <>
          {chartOnlyPages}
          {renderCommentPages()}
        </>
      ) : (
        <>
          {commentData.slice(1).map((comments, i) => (
            <Page
              key={`com-extra-${i}`}
              size={config.pageSize}
              orientation={config.pageOrientation}
              style={styles.page}
            >
              <Text style={styles.commentHeader}>
                {sanitizePdfText(commentHeaders[i + 1] ?? "")}
              </Text>
              {comments.map((c, ci) => (
                <View key={ci} style={styles.commentRow} wrap={false}>
                  <Text style={styles.commentBullet}>{"\u2022"}</Text>
                  <Text style={styles.commentItem}>{sanitizePdfText(c)}</Text>
                </View>
              ))}
            </Page>
          ))}
          {chartPairs.map((pair, pi) => (
            <Page
              key={`cp-${pi}`}
              size={config.pageSize}
              orientation={config.pageOrientation}
              style={styles.page}
            >
              {pair.map((imgSrc, j) => (
                <View key={j} style={styles.chartBlock} wrap={false}>
                  <Image style={styles.chartImage} src={imgSrc} />
                </View>
              ))}
            </Page>
          ))}
        </>
      )}
    </Document>
  );
}

export default ReportDocument;
