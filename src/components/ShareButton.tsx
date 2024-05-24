"use client";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

export default function ShareButton({ id }: { id: string }) {
  return (
    <div>
      <h1 className="flex justify-center">Share</h1>
      <div className="flex justify-center">
        <div className="px-2">
          <FacebookShareButton url={`https://www.every.org/${id}/donate`}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div className="px-2">
          <WhatsappShareButton url={`https://www.every.org/${id}/donate`}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
        <div className="px-2">
          <LinkedinShareButton url={`https://www.every.org/${id}/donate`}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <div className="px-2">
          <TwitterShareButton
            url={`https://www.every.org/${id}/donate`}
            title={
              "next-share is a social share buttons for your next React apps."
            }
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
}
