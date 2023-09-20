import { useTranslation } from "react-i18next";
import { ReviewsData } from "@app/types/types";
import { dateFormatter } from "@app/utils";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

interface ReviewPdfProps {
  pdfDocumentData: ReviewsData;
  ratingValue: number;
}

const ReviewPdf = (props: ReviewPdfProps) => {
  const { pdfDocumentData, ratingValue } = props;
  const { t } = useTranslation();

  return (
    <Document>
      <Page
        size="A4"
        wrap={false}
        style={{
          backgroundColor: "#FFF",
          marginTop: "40px",
          marginBottom: "40px",
          height: 297,
          padding: "24px",
        }}
      >
        <View style={{ textAlign: "center" }}>
          <Text style={{ fontSize: "32px", fontWeight: 500, color: "#2C2C2C" }}>
            {pdfDocumentData?.reviewTitle}
          </Text>
          <Text style={{ fontSize: "20px", fontWeight: 500, color: "#000000" }}>
            {pdfDocumentData?.workName}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "40px",
            marginTop: "16px",
            marginBottom: "20px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "8px",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#000000",
                paddingRight: "10px",
              }}
            >
              Category:
            </Text>
            <Text style={{ fontSize: "16px", color: "#686868" }}>
              {pdfDocumentData?.category?.name}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "8px",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#000000",
                paddingRight: "10px",
              }}
            >
              Tags:
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: 400, color: "#686868" }}
            >
              {pdfDocumentData?.tags.map((tag) => (
                <Text
                  key={tag.id}
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#686868",
                    marginLeft: "4px",
                  }}
                >
                  {`#${tag.name} `}
                </Text>
              ))}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "8px",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#000000",
                paddingRight: "10px",
              }}
            >
              Created by:
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: 400, color: "#686868" }}
            >
              {pdfDocumentData?.user.fullName}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#686868",
                marginLeft: "8px",
                paddingTop: "2px",
              }}
            >
              {`at ${dateFormatter(pdfDocumentData?.createdTime)}`}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "8px",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#000000",
                paddingRight: "10px",
              }}
            >
              Likes:
            </Text>
            <Text style={{ fontSize: "16px", color: "#686868" }}>
              {pdfDocumentData?.likes?.length}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#000000",
                paddingRight: "10px",
              }}
            >
              Rating:
            </Text>
            <Text style={{ fontSize: "16px", color: "#686868" }}>
              {ratingValue}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          {pdfDocumentData?.reviewImages?.map(
            (reviewImage: string, i: number) => (
              <Image
                src={reviewImage}
                key={i}
                style={{ width: "165px", height: "220px", borderRadius: "8px" }}
              />
            )
          )}
        </View>
        <View style={{ marginBottom: "40px" }}>
          <Text style={{ fontSize: "14px", color: "#000000" }}>
            {pdfDocumentData?.reviewContent}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReviewPdf;
