import { jsPDF } from "jspdf";
import "./Certificate.css";

const Certificate = ({
  name,
  score,
  totalQuestions,
  percentage,
  timeUp,
  onRestart,
}) => {
  const date = new Date();

  const formattedDate = date.toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const certificateId = `UI26-APW-${Date.now()
    .toString()
    .slice(-8)}`;

  const downloadCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 297;
    const pageHeight = 210;

    /* =========================
       BACKGROUND
    ========================= */

    doc.setFillColor(7, 19, 12);
    doc.rect(
      0,
      0,
      pageWidth,
      pageHeight,
      "F"
    );

    /* =========================
       OUTER BORDER
    ========================= */

    doc.setDrawColor(87, 174, 114);
    doc.setLineWidth(1.5);

    doc.rect(
      8,
      8,
      pageWidth - 16,
      pageHeight - 16
    );

    doc.setDrawColor(196, 160, 70);
    doc.setLineWidth(0.6);

    doc.rect(
      13,
      13,
      pageWidth - 26,
      pageHeight - 26
    );

    /* =========================
       CORNER DECORATIONS
    ========================= */

    doc.setDrawColor(87, 174, 114);
    doc.setLineWidth(1);

    const corners = [
      [18, 18],
      [279, 18],
      [18, 192],
      [279, 192],
    ];

    corners.forEach(([x, y], i) => {
      if (i === 1) {
        doc.line(x, y, x - 12, y);
        doc.line(x, y, x, y + 12);
      } else if (i === 2) {
        doc.line(x, y, x + 12, y);
        doc.line(x, y, x, y - 12);
      } else if (i === 3) {
        doc.line(x, y, x - 12, y);
        doc.line(x, y, x, y - 12);
      } else {
        doc.line(x, y, x + 12, y);
        doc.line(x, y, x, y + 12);
      }
    });

    /* =========================
       HEADER
    ========================= */

    doc.setTextColor(196, 160, 70);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(11);

    doc.text(
      "UI'26 APW",
      pageWidth / 2,
      34,
      {
        align: "center",
      }
    );

    /* =========================
       TITLE
    ========================= */

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(27);

    doc.text(
      "CERTIFICATE OF ACHIEVEMENT",
      pageWidth / 2,
      52,
      {
        align: "center",
      }
    );

    /* =========================
       SUBTITLE
    ========================= */

    doc.setTextColor(180, 200, 187);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(11);

    doc.text(
      "This certificate is proudly presented to",
      pageWidth / 2,
      66,
      {
        align: "center",
      }
    );

    /* =========================
       NAME
    ========================= */

    doc.setTextColor(87, 174, 114);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(24);

    doc.text(
      name.toUpperCase(),
      pageWidth / 2,
      84,
      {
        align: "center",
      }
    );

    /* =========================
       DIVIDER
    ========================= */

    doc.setDrawColor(196, 160, 70);
    doc.setLineWidth(0.5);

    doc.line(
      85,
      91,
      212,
      91
    );

    /* =========================
       DESCRIPTION
    ========================= */

    doc.setTextColor(210, 220, 214);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(10);

    doc.text(
      "for successfully completing the UI'26 APW Knowledge Quiz",
      pageWidth / 2,
      104,
      {
        align: "center",
      }
    );

    /* =========================
       SCORE
    ========================= */

    doc.setTextColor(255, 255, 255);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(15);

    doc.text(
      "FINAL SCORE",
      pageWidth / 2,
      119,
      {
        align: "center",
      }
    );

    doc.setTextColor(87, 174, 114);

    doc.setFontSize(22);

    doc.text(
      `${score} / ${totalQuestions}`,
      pageWidth / 2,
      132,
      {
        align: "center",
      }
    );

    doc.setTextColor(196, 160, 70);

    doc.setFontSize(12);

    doc.text(
      `${percentage}% CORRECT`,
      pageWidth / 2,
      142,
      {
        align: "center",
      }
    );

    /* =========================
       DATE
    ========================= */

    doc.setTextColor(180, 200, 187);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(9);

    doc.text(
      formattedDate,
      pageWidth / 2,
      154,
      {
        align: "center",
      }
    );

    /* =========================
       SIGNATURE
    ========================= */

    doc.setDrawColor(150, 170, 157);

    doc.line(
      55,
      174,
      105,
      174
    );

    doc.line(
      192,
      174,
      242,
      174
    );

    doc.setTextColor(220, 225, 222);

    doc.setFontSize(8);

    doc.text(
      "Authorized Signature",
      80,
      181,
      {
        align: "center",
      }
    );

    doc.text(
      "UI'26 APW",
      217,
      181,
      {
        align: "center",
      }
    );

    /* =========================
       CERTIFICATE ID
    ========================= */

    doc.setTextColor(130, 150, 137);

    doc.setFontSize(7);

    doc.text(
      `Certificate ID: ${certificateId}`,
      pageWidth / 2,
      194,
      {
        align: "center",
      }
    );

    /* =========================
       DOWNLOAD
    ========================= */

    const safeName = name
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();

    doc.save(
      `UI26-APW-${safeName}-certificate.pdf`
    );
  };

  return (
    <div className="certificate-page">

      <div className="certificate-wrapper">

        <div className="certificate">

          <div className="certificate-corner top-left"></div>
          <div className="certificate-corner top-right"></div>
          <div className="certificate-corner bottom-left"></div>
          <div className="certificate-corner bottom-right"></div>

          <p className="certificate-event">
            UI'26 APW
          </p>

          <h1>
            CERTIFICATE OF
            <span> ACHIEVEMENT</span>
          </h1>

          <p className="certificate-presented">
            This certificate is proudly presented to
          </p>

          <h2 className="participant-name">
            {name}
          </h2>

          <div className="certificate-line"></div>

          <p className="certificate-description">
            for successfully completing the
            <strong> UI'26 APW Knowledge Quiz</strong>
          </p>

          <div className="certificate-score">

            <p>
              FINAL SCORE
            </p>

            <strong>
              {score}
              <span>
                /{totalQuestions}
              </span>
            </strong>

            <small>
              {percentage}% CORRECT
            </small>

          </div>

          <p className="certificate-date">
            {formattedDate}
          </p>

          <div className="certificate-footer">

            <div>
              <div className="signature-line"></div>

              <span>
                Authorized Signature
              </span>
            </div>

            <div>
              <div className="signature-line"></div>

              <span>
                UI'26 APW
              </span>
            </div>

          </div>

          <p className="certificate-id">
            Certificate ID: {certificateId}
          </p>

        </div>

        <div className="certificate-actions">

          <button
            className="download-certificate"
            onClick={downloadCertificate}
          >
            <span>↓</span>
            Download Certificate
          </button>

          <button
            className="retake-button"
            onClick={onRestart}
          >
            Take Quiz Again
          </button>

        </div>

        {timeUp && (
          <p className="certificate-timeup">
            Your time expired and the quiz was submitted automatically.
          </p>
        )}

      </div>

    </div>
  );
};

export default Certificate;