import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { reportConfig } from "../config/reportConfig";
import { interpolateTitle } from "../utils/reportHelpers";

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
    marginLeft: 10,
    marginBottom: 3,
    fontSize: 10,
  },
  commentRow: {
    marginBottom: 2,
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
}) {
  const title = interpolateTitle(reportConfig.titleTemplate, {
    courseName,
    moduleName,
    faculty,
    batchMonth,
    batchYear,
    moduleco,
  });

  return (
    <View style={{ marginBottom: 6 }}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.hr} />
      <Text style={styles.metaCell}>Module Name: {moduleName}</Text>
      {batchMonth || batchYear ? (
        <Text style={styles.metaCell}>
          Batch: {batchMonth} {batchYear}
        </Text>
      ) : null}
      {faculty && faculty.trim() ? (
        <Text style={styles.metaCell}>Faculty Name: {faculty}</Text>
      ) : null}
      {moduleco && moduleco.trim() ? (
        <Text style={styles.metaCell}>Module Coordinator: {moduleco}</Text>
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
  chartHeaders,
  commentData,
  commentHeaders,
}) {
  // Group charts into pairs — 2 per page, each full-width (single column)
  const chartPairs = [];
  for (let i = 0; i < chartImages.length; i += 2) {
    chartPairs.push(chartImages.slice(i, i + 2));
  }

  return (
    <Document>
      {/* Page 1: title block + first pair of charts */}
      <Page
        size={reportConfig.pageSize}
        orientation={reportConfig.pageOrientation}
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
        />
        {chartPairs[0]?.map((imgSrc, j) => (
          <View key={j} style={styles.chartBlock} wrap={false}>
            <Image style={styles.chartImage} src={imgSrc} />
          </View>
        ))}
      </Page>

      {/* One new page per subsequent pair of charts */}
      {chartPairs.slice(1).map((pair, pi) => (
        <Page
          key={`cp-${pi}`}
          size={reportConfig.pageSize}
          orientation={reportConfig.pageOrientation}
          style={styles.page}
        >
          {pair.map((imgSrc, j) => (
            <View key={j} style={styles.chartBlock} wrap={false}>
              <Image style={styles.chartImage} src={imgSrc} />
            </View>
          ))}
        </Page>
      ))}

      {/* Each comment section gets its own page */}
      {commentData.map((comments, i) => (
        <Page
          key={`com-${i}`}
          size={reportConfig.pageSize}
          orientation={reportConfig.pageOrientation}
          style={styles.page}
        >
          <Text style={styles.commentHeader}>{commentHeaders[i]}</Text>
          {comments.map((c, ci) => (
            <View key={ci} style={styles.commentRow} wrap={false}>
              <Text style={styles.commentItem}>• {c}</Text>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  );
}

export default ReportDocument;
