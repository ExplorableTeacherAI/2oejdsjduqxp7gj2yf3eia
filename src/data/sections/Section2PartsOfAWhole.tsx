/**
 * Section 2: Parts of a Whole
 *
 * Students explore dividing different shapes into equal parts
 * and see how fractions describe the shaded portion.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineFeedback,
    InlineToggle,
} from "@/components/atoms";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    togglePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ============================================
// REACTIVE SHAPE DIVIDER VISUALIZATION
// ============================================

function ReactiveShapeVisualization() {
    const totalParts = useVar("shapeParts", 4) as number;
    const shadedParts = useVar("shapeShadedParts", 1) as number;
    const shapeType = useVar("shapeType", "circle") as string;

    const actualShaded = Math.min(shadedParts, totalParts);

    const centerX = 150;
    const centerY = 150;
    const radius = 110;

    if (shapeType === "circle") {
        // Circle visualization (pie chart style)
        const slices = [];
        for (let i = 0; i < totalParts; i++) {
            const startAngle = (i * 360) / totalParts - 90;
            const endAngle = ((i + 1) * 360) / totalParts - 90;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = centerX + radius * Math.cos(startRad);
            const y1 = centerY + radius * Math.sin(startRad);
            const x2 = centerX + radius * Math.cos(endRad);
            const y2 = centerY + radius * Math.sin(endRad);

            const largeArc = 360 / totalParts > 180 ? 1 : 0;
            const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

            const isShaded = i < actualShaded;

            slices.push(
                <path
                    key={i}
                    d={pathD}
                    fill={isShaded ? "#8E90F5" : "#E0E7FF"}
                    stroke="#6366F1"
                    strokeWidth="2"
                />
            );
        }

        return (
            <div className="relative flex flex-col items-center">
                <svg width="300" height="300" viewBox="0 0 300 300">
                    {slices}
                    <circle cx={centerX} cy={centerY} r="4" fill="#4338CA" />
                </svg>
                <div className="mt-4 text-center">
                    <div className="text-3xl font-bold">
                        <span style={{ color: "#AC8BF9" }}>{actualShaded}</span>
                        <span className="mx-1">/</span>
                        <span style={{ color: "#8E90F5" }}>{totalParts}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                        {actualShaded} out of {totalParts} parts shaded
                    </p>
                </div>
                <InteractionHintSequence
                    hintKey="shape-divider-hint"
                    steps={[
                        {
                            gesture: "drag-horizontal",
                            label: "Drag the numbers to change the shape",
                            position: { x: "50%", y: "50%" },
                        },
                    ]}
                />
            </div>
        );
    } else {
        // Rectangle visualization (chocolate bar style)
        const rectWidth = 240;
        const rectHeight = 160;
        const startX = (300 - rectWidth) / 2;
        const startY = (300 - rectHeight) / 2;
        const partWidth = rectWidth / totalParts;

        const parts = [];
        for (let i = 0; i < totalParts; i++) {
            const isShaded = i < actualShaded;
            parts.push(
                <rect
                    key={i}
                    x={startX + i * partWidth}
                    y={startY}
                    width={partWidth}
                    height={rectHeight}
                    fill={isShaded ? "#8E90F5" : "#E0E7FF"}
                    stroke="#6366F1"
                    strokeWidth="2"
                />
            );
        }

        return (
            <div className="relative flex flex-col items-center">
                <svg width="300" height="300" viewBox="0 0 300 300">
                    {parts}
                </svg>
                <div className="mt-4 text-center">
                    <div className="text-3xl font-bold">
                        <span style={{ color: "#AC8BF9" }}>{actualShaded}</span>
                        <span className="mx-1">/</span>
                        <span style={{ color: "#8E90F5" }}>{totalParts}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                        {actualShaded} out of {totalParts} parts shaded
                    </p>
                </div>
                <InteractionHintSequence
                    hintKey="rectangle-divider-hint"
                    steps={[
                        {
                            gesture: "drag-horizontal",
                            label: "Drag the numbers to change the shape",
                            position: { x: "50%", y: "50%" },
                        },
                    ]}
                />
            </div>
        );
    }
}

// ============================================
// FIXED ASSESSMENT VISUAL (2 out of 4 shaded)
// ============================================

function AssessmentVisual() {
    // Fixed: 2 out of 4 parts shaded
    const totalParts = 4;
    const shadedParts = 2;

    const rectWidth = 200;
    const rectHeight = 120;
    const startX = (260 - rectWidth) / 2;
    const startY = (180 - rectHeight) / 2;
    const partWidth = rectWidth / totalParts;

    const parts = [];
    for (let i = 0; i < totalParts; i++) {
        const isShaded = i < shadedParts;
        parts.push(
            <rect
                key={i}
                x={startX + i * partWidth}
                y={startY}
                width={partWidth}
                height={rectHeight}
                fill={isShaded ? "#62D0AD" : "#D1FAE5"}
                stroke="#10B981"
                strokeWidth="2"
            />
        );
    }

    return (
        <svg
            width="260"
            height="180"
            viewBox="0 0 260 180"
            className="mx-auto"
        >
            {parts}
        </svg>
    );
}

// ============================================
// SECTION BLOCKS
// ============================================

export const section2Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-section2-heading" maxWidth="xl">
        <Block id="section2-heading" padding="md">
            <EditableH2 id="h2-section2-heading" blockId="section2-heading">
                Parts of a Whole
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-section2-intro" maxWidth="xl">
        <Block id="section2-intro" padding="sm">
            <EditableParagraph id="para-section2-intro" blockId="section2-intro">
                Fractions can describe parts of any shape, not just pizza! The
                important thing is that the shape must be divided into{" "}
                <strong>equal parts</strong>. Let's explore how different shapes
                can be divided and how fractions describe the shaded portions.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive shape divider
    <SplitLayout key="layout-section2-shapes" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="section2-shape-controls" padding="sm">
                <EditableParagraph
                    id="para-section2-shape-controls"
                    blockId="section2-shape-controls"
                >
                    Try changing the shape! Click on{" "}
                    <InlineToggle
                        id="toggle-shape-type"
                        varName="shapeType"
                        options={["circle", "rectangle"]}
                        {...togglePropsFromDefinition(
                            getVariableInfo("shapeType")
                        )}
                    />{" "}
                    to switch between shapes. This shape is divided into{" "}
                    <InlineScrubbleNumber
                        varName="shapeParts"
                        {...numberPropsFromDefinition(
                            getVariableInfo("shapeParts")
                        )}
                    />{" "}
                    equal parts, and{" "}
                    <InlineScrubbleNumber
                        varName="shapeShadedParts"
                        {...numberPropsFromDefinition(
                            getVariableInfo("shapeShadedParts")
                        )}
                    />{" "}
                    of them are shaded purple.
                </EditableParagraph>
            </Block>
            <Block id="section2-shape-explanation" padding="sm">
                <EditableParagraph
                    id="para-section2-shape-explanation"
                    blockId="section2-shape-explanation"
                >
                    Notice how the fraction changes as you adjust the numbers.
                    The <strong style={{ color: "#AC8BF9" }}>top number</strong>{" "}
                    always shows how many parts are shaded, and the{" "}
                    <strong style={{ color: "#8E90F5" }}>bottom number</strong>{" "}
                    shows the total number of equal parts.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="section2-shape-visual" padding="sm" hasVisualization>
            <ReactiveShapeVisualization />
        </Block>
    </SplitLayout>,

    // Key insight
    <StackLayout key="layout-section2-insight" maxWidth="xl">
        <Block id="section2-insight" padding="sm">
            <EditableParagraph
                id="para-section2-insight"
                blockId="section2-insight"
            >
                <strong>Key Insight:</strong> Whether it's a circle, rectangle,
                or any other shape, fractions work the same way. The whole shape
                represents "1" (one whole thing), and the fraction tells us what
                portion of that whole is shaded or selected.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment question
    <StackLayout key="layout-section2-question" maxWidth="xl">
        <Block id="section2-question" padding="md">
            <EditableParagraph
                id="para-section2-question"
                blockId="section2-question"
            >
                <strong>Your Turn:</strong> Look at the rectangle below. It is
                divided into equal parts with some parts shaded green.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-section2-question-visual" maxWidth="md">
        <Block id="section2-question-visual" padding="sm">
            <AssessmentVisual />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-section2-question-input" maxWidth="xl">
        <Block id="section2-question-input" padding="sm">
            <EditableParagraph
                id="para-section2-question-input"
                blockId="section2-question-input"
            >
                How many parts are shaded?{" "}
                <InlineFeedback
                    varName="answerPartsShaded"
                    correctValue="2"
                    position="terminal"
                    successMessage="— correct! There are 2 green parts"
                    failureMessage="— count the green parts again"
                    hint="Count only the coloured parts"
                >
                    <InlineClozeInput
                        varName="answerPartsShaded"
                        correctAnswer="2"
                        {...clozePropsFromDefinition(
                            getVariableInfo("answerPartsShaded")
                        )}
                    />
                </InlineFeedback>. How many parts are there in total?{" "}
                <InlineFeedback
                    varName="answerTotalParts"
                    correctValue="4"
                    position="terminal"
                    successMessage="— that's right! So the fraction is 2/4"
                    failureMessage="— count all the parts, both green and white"
                    hint="Count every section of the rectangle"
                >
                    <InlineClozeInput
                        varName="answerTotalParts"
                        correctAnswer="4"
                        {...clozePropsFromDefinition(
                            getVariableInfo("answerTotalParts")
                        )}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
