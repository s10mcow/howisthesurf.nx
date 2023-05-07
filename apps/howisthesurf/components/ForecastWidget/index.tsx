import React, { useEffect } from "react";
import styled from "@emotion/styled";

const ForecastWidgetContainer = styled.div`
  .sc-widget-footer {
    display: none !important;
  }

  margin-bottom: 20px;
`;

export const ForecastWidget = () => {
  const [widgetHtml, setWidgetHtml] = React.useState("<div></div>");
  const slug = "flagler-beach-florida";
  useEffect(() => {
    const robotoHref =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
    if (!document.querySelectorAll('link[href="' + robotoHref + '"]').length) {
      const robotoFont = document.createElement("link");
      robotoFont.id = "si-widget-roboto-font";
      robotoFont.rel = "stylesheet";
      robotoFont.href = robotoHref;
      document.head.appendChild(robotoFont);
    }

    if (!document.getElementById("sc-widget-forecast-css")) {
      const link = document.createElement("link");
      link.setAttribute("id", "si-widget-forecast-css");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute(
        "href",
        "https://surfcaptain.com/css/widget_forecast.css"
      );
      document.head.appendChild(link);
    }

    //determine if mobile device
    const androidOrIphoneDevice = /Android|iPhone|iPod/i.test(
      navigator.userAgent
    )
      ? "true"
      : "false";

    fetch(
      `https://api.surfcaptain.com/api/widget?widgetType=forecast
        &slug=${slug}
        &mobile=${androidOrIphoneDevice}
        &theme=light&units=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not okay");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.errorMsg) {
          const html = data.widgetHtml;
          setWidgetHtml(html);
        } else throw new Error("Surf Captain error: " + data.errorMsg);
      })
      .catch((error) => {
        console.error("There was a problem fetching the widget", error);
      });
  }, []);

  return (
    <ForecastWidgetContainer>
      <div dangerouslySetInnerHTML={{ __html: widgetHtml }}></div>
    </ForecastWidgetContainer>
  );
};
