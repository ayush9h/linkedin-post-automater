"use client";

import Markdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Preview({
  content,
  image,
  loadingContent,
  loadingImage,
}: {
  content: string;
  image: string;
  loadingContent: boolean;
  loadingImage: boolean;
}) {
  return (
    <div className="w-[70%]">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full rounded-md bg-white">
            <h2 className="text-sm font-semibold text-stone-900 mb-3">
              Generated Content
            </h2>

            <div className="h-[calc(100%-2rem)] rounded-md border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700 overflow-y-auto">
              {loadingContent ? (
                <Skeleton className="h-full w-full rounded-md" />
              ) : content ? (
                <Markdown>{content}</Markdown>
              ) : (
                <p className="text-stone-500 flex items-center justify-center h-full">
                  Content will appear here...
                </p>
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-stone-200" />

        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="h-full rounded-md bg-white ">
            <h2 className="text-sm font-semibold text-stone-900 mb-3">
              Generated Image
            </h2>

            <div className="h-[calc(100%-2rem)] rounded-md border border-stone-200 bg-stone-50 flex items-center justify-center overflow-hidden">
              {loadingImage ? (
                <Skeleton className="h-full w-full rounded-md" />
              ) : image ? (
                <img
                  src={image}
                  alt="Generated"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <p className="text-stone-500">Image will appear here...</p>
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
