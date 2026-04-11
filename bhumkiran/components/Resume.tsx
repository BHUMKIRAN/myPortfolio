"use client";

import getData from "@/service/Contentful";
import React, { useEffect, useState } from "react";

const Resume: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("Education");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      const resume = res?.fields?.resume?.resumeSection;
      setData(resume);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="text-center py-20 text-[var(--text-muted)]">
        Loading Resume...
      </div>
    );
  }

  const { header, tabs, data: resumeData } = data;

  // normalize key mapping (Contentful uses lowercase)
  const keyMap: any = {
    Education: "education",
    Experience: "experience",
    Skills: "skills",
  };

  const activeKey = keyMap[activeTab];

  // timeline split logic (only for Education & Experience)
  const timelineItems =
    activeTab !== "Skills" ? resumeData?.[activeKey] || [] : [];

  const leftCol = timelineItems.filter((_: any, i: number) => i % 2 === 0);
  const rightCol = timelineItems.filter((_: any, i: number) => i % 2 !== 0);

  return (
    <section
      id="resume"
      className="py-20 px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-sm font-bold uppercase tracking-[4px] mb-2"
            style={{ color: "var(--primary)" }}
          >
            {header?.tag}
          </p>
          <h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ color: "var(--text-primary)" }}
          >
            {header?.title}
          </h1>
        </div>

        {/* Tabs */}
        <div
          className="flex w-full mb-20 p-2"
          style={{
            background: "var(--bg)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-neo)",
          }}
        >
          {tabs?.map((tab: string) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-5 rounded-xl font-bold transition-all  duration-300 cursor-pointer"
              style={{
                color:
                  activeTab === tab ? "var(--primary)" : "var(--text-muted)",
                background: activeTab === tab ? "var(--bg)" : "transparent",
                boxShadow: activeTab === tab ? "var(--shadow-neo)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SKILLS SECTION */}
        {activeTab === "Skills" ? (
          <div className="grid md:grid-cols-2 gap-10">
            {resumeData?.skills?.map((group: any, i: number) => (
              <div
                key={i}
                className="p-8 bg-[var(--surface)]"
                style={{
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-neo)",
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">
                  {group.categoryTitle}
                </h3>

                <div className="flex flex-wrap gap-4">
                  {group.skillList?.map((skill: any, idx: number) => (
                    <div key={idx} className="relative group">
                      <span
                        className="px-4 py-2 text-sm font-medium rounded-full"
                        style={{
                          background: "var(--bg)",
                          boxShadow: "var(--shadow-neo)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {skill.name}
                      </span>

                      <span
                        className="absolute -top-4 -right-5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--primary)",
                          color: "#fff",
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TIMELINE SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            {[leftCol, rightCol].map((columnItems, colIdx) => (
              <div key={colIdx} className="relative">
                <div className="mb-12 ml-10">
                  <p className="text-[var(--primary)] font-bold mb-2">
                    {columnItems[0]?.year}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                    {colIdx === 0
                      ? `${activeTab} Quality`
                      : `${activeTab} History`}
                  </h2>
                </div>

                <div
                  className="absolute top-28 bottom-0 left-[7px] w-[2px] opacity-20"
                  style={{ background: "var(--text-muted)" }}
                />

                {columnItems.map((item: any, index: number) => (
                  <div key={index} className="relative mb-12 ml-12 group">
                    <div
                      className="absolute left-[-54px] top-10 w-5 h-5 rounded-full"
                      style={{
                        background: "var(--bg)",
                        border: "4px solid rgba(0,0,0,0.1)",
                      }}
                    />

                    <div
                      className="p-8 bg-[var(--surface)]"
                      style={{
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-neo)",
                      }}
                    >
                      <div className="flex justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-[var(--text-primary)]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] mt-2">
                            {item.year}
                          </p>
                        </div>

                        <div
                          className="px-3 py-1 text-xs font-bold rounded"
                          style={{
                            background: "var(--bg)",
                            color: "var(--primary)",
                          }}
                        >
                          {item.rating || "N/A"}
                        </div>
                      </div>

                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Resume;
