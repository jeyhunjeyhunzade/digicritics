import { useContext, useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import { AppContext } from "@app/pages/App";
import { AppContextShape, CloudTags } from "@app/types/types";

const Tags = () => {
  const { tags } = useContext(AppContext) as AppContextShape;
  const [cloudTags, setCloudTags] = useState<CloudTags[]>([]);

  useEffect(() => {
    let cloudTags: CloudTags[];
    if (tags.length) {
      cloudTags = tags.map((tag) => {
        return {
          value: tag,
          count: Math.floor(Math.random() * 16) + 15,
        };
      });
      setCloudTags(cloudTags);
    }
  }, [tags]);

  const customRenderer = (tag: CloudTags, size: number) => (
    <span
      key={tag.value}
      style={{
        animation: "blinker 3s linear infinite",
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size / 2}em`,
        margin: "3px",
        padding: "3px",
        display: "inline-block",
        color: "#0483B6",
      }}
    >
      {tag.value}
    </span>
  );
  return (
    <TagCloud
      minSize={2}
      maxSize={5}
      tags={cloudTags}
      renderer={customRenderer}
      className="cursor-pointer"
      onClick={(tag: CloudTags) => alert(`'${tag.value}' was selected!`)}
    />
  );
};

export default Tags;
