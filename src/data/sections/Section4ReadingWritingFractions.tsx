/**
 * Section 4: Reading and Writing Fractions
 *
 * Students practice identifying fractions from pictures
 * and writing them correctly with numerator over denominator.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout, GridLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineFeedback,
} from "@/components/atoms";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ============================================
// FRACTION READING HELPER - Converts to words
// ============================================

function FractionWord({
    numerator,
    denominator,
}: {
    numerator: number;
    denominator: number;
}) {
    const denominatorWords: Record<number, string> = {
        2: "half",
        3: "third",
        4: "quarter",
        5: "fifth",
        6: "sixth",
        7: "seventh",
        8: "eighth",
    };

    const pluralSuffix = numerator > 1 ? "s" : "";
    const word = denominatorWords[denominator] || `${denominator}th`;

    // Special case for halves
    const finalWord =
        denominator === 2 && numerator > 1
            ? "halves"
            : word + pluralSuffix;

    return (
        <span className="font-medium text-indigo-600">
            {numerator} {finalWord}
        </span>
    );
}

// ============================================
// REACTIVE PRACTICE VISUALIZATION
// ============================================

function ReactivePracticeVisual() {
    const totalParts = useVar("practiceTotalParts", 4) as number;
    const shadedParts = useVar("practiceShadedParts", 3) as number;

    const actualShaded = Math.min(shadedParts, totalParts);

    const centerX = 120;
    const centerY = 120;
    const radius = 90;

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
                fill={isShaded ? "#62D0AD" : "#D1FAE5"}
                stroke="#059669"
                strokeWidth="2"
            />
        );
    }

    return (
        <div className="relative flex flex-col items-center">
            <svg width="240" height="240" viewBox="0 0 240 240">
                {slices}
                <circle cx={centerX} cy={centerY} r="3" fill="#047857" />
            </svg>

            <div className="mt-4 text-center">
                <p className="text-lg">
                    <strong style={{ color: "#F7B23B" }}>{actualShaded}</strong>{" "}
                    out of{" "}
                    <strong style={{ color: "#62D0AD" }}>{totalParts}</strong>{" "}
                    parts are shaded
                </p>
                <p className="text-2xl font-bold mt-2">
                    <span style={{ color: "#F7B23B" }}>{actualShaded}</span>/
                    <span style={{ color: "#62D0AD" }}>{totalParts}</span>
                </p>
                <p className="text-sm text-slate-600 mt-1">
                    We say:{" "}
                    <FractionWord
                        numerator={actualShaded}
                        denominator={totalParts}
                    />
                </p>
            </div>

            <InteractionHintSequence
                hintKey="practice-fraction-hint"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the numbers to create different fractions",
                        position: { x: "50%", y: "40%" },
                    },
                ]}
            />
        </div>
    );
}

// ============================================
// FIXED ASSESSMENT VISUALS
// ============================================

function AssessmentCircle34() {
    // Fixed: 3 out of 4 parts shaded
    const totalParts = 4;
    const shadedParts = 3;

    const centerX = 80;
    const centerY = 80;
    const radius = 60;

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

        const isShaded = i < shadedParts;

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
        <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            className="mx-auto"
        >
            {slices}
            <circle cx={centerX} cy={centerY} r="3" fill="#4338CA" />
        </svg>
    );
}

// ============================================
// COMMON FRACTIONS EXAMPLES
// ============================================

function FractionExample({
    numerator,
    denominator,
    color,
}: {
    numerator: number;
    denominator: number;
    color: string;
}) {
    const centerX = 50;
    const centerY = 50;
    const radius = 40;

    const slices = [];
    for (let i = 0; i < denominator; i++) {
        const startAngle = (i * 360) / denominator - 90;
        const endAngle = ((i + 1) * 360) / denominator - 90;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);

        const largeArc = 360 / denominator > 180 ? 1 : 0;
        const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        const isShaded = i < numerator;

        slices.push(
            <path
                key={i}
                d={pathD}
                fill={isShaded ? color : "#F1F5F9"}
                stroke="#64748B"
                strokeWidth="1.5"
            />
        );
    }

    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
            <svg width="100" height="100" viewBox="0 0 100 100">
                {slices}
            </svg>
            <p className="text-2xl font-bold mt-2" style={{ color }}>
                {numerator}/{denominator}
            </p>
            <p className="text-sm text-slate-600">
                <FractionWord numerator={numerator} denominator={denominator} />
            </p>
        </div>
    );
}

// ============================================
// SECTION BLOCKS
// ============================================

export const section4Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-section4-heading" maxWidth="xl">
        <Block id="section4-heading" padding="md">
            <EditableH2 id="h2-section4-heading" blockId="section4-heading">
                Reading and Writing Fractions
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-section4-intro" maxWidth="xl">
        <Block id="section4-intro" padding="sm">
            <EditableParagraph id="para-section4-intro" blockId="section4-intro">
                Now that you know what fractions are and their parts, let's
                practice reading and writing them! When we write a fraction, we
                put the numerator on top and the denominator on the bottom,
                separated by a line.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive practice
    <SplitLayout key="layout-section4-practice" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="section4-practice-instructions" padding="sm">
                <EditableParagraph
                    id="para-section4-practice-instructions"
                    blockId="section4-practice-instructions"
                >
                    Try creating different fractions! Divide the circle into{" "}
                    <InlineScrubbleNumber
                        varName="practiceTotalParts"
                        {...numberPropsFromDefinition(
                            getVariableInfo("practiceTotalParts")
                        )}
                    />{" "}
                    parts, and shade{" "}
                    <InlineScrubbleNumber
                        varName="practiceShadedParts"
                        {...numberPropsFromDefinition(
                            getVariableInfo("practiceShadedParts")
                        )}
                    />{" "}
                    of them. Watch how the fraction and its name change!
                </EditableParagraph>
            </Block>
            <Block id="section4-reading-tip" padding="sm">
                <EditableParagraph
                    id="para-section4-reading-tip"
                    blockId="section4-reading-tip"
                >
                    <strong>How to Read Fractions:</strong> We read fractions by
                    saying the numerator first, then using a special word for
                    the denominator. For example, 1/2 is "one half", 1/4 is "one
                    quarter", and 3/4 is "three quarters".
                </EditableParagraph>
            </Block>
        </div>
        <Block id="section4-practice-visual" padding="sm" hasVisualization>
            <ReactivePracticeVisual />
        </Block>
    </SplitLayout>,

    // Common fractions examples
    <StackLayout key="layout-section4-examples-title" maxWidth="xl">
        <Block id="section4-examples-title" padding="sm">
            <EditableParagraph
                id="para-section4-examples-title"
                blockId="section4-examples-title"
            >
                <strong>Common Fractions You'll See Often:</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <GridLayout key="layout-section4-examples" columns={4} gap="md">
        <Block id="section4-example-half" padding="sm">
            <FractionExample numerator={1} denominator={2} color="#F7B23B" />
        </Block>
        <Block id="section4-example-quarter" padding="sm">
            <FractionExample numerator={1} denominator={4} color="#62D0AD" />
        </Block>
        <Block id="section4-example-third" padding="sm">
            <FractionExample numerator={1} denominator={3} color="#8E90F5" />
        </Block>
        <Block id="section4-example-three-quarters" padding="sm">
            <FractionExample numerator={3} denominator={4} color="#AC8BF9" />
        </Block>
    </GridLayout>,

    // Assessment
    <StackLayout key="layout-section4-question-intro" maxWidth="xl">
        <Block id="section4-question-intro" padding="md">
            <EditableParagraph
                id="para-section4-question-intro"
                blockId="section4-question-intro"
            >
                <strong>Write the Fraction:</strong> Look at the circle below
                and write the fraction that shows how much is shaded.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-section4-question-visual" maxWidth="sm">
        <Block id="section4-question-visual" padding="sm">
            <AssessmentCircle34 />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-section4-question-input" maxWidth="xl">
        <Block id="section4-question-input" padding="sm">
            <EditableParagraph
                id="para-section4-question-input"
                blockId="section4-question-input"
            >
                The fraction is:{" "}
                <InlineFeedback
                    varName="answerWriteFractionTop"
                    correctValue="3"
                    position="mid"
                    successMessage="✓"
                    failureMessage="✗"
                    hint="Count the purple parts"
                >
                    <InlineClozeInput
                        varName="answerWriteFractionTop"
                        correctAnswer="3"
                        {...clozePropsFromDefinition(
                            getVariableInfo("answerWriteFractionTop")
                        )}
                    />
                </InlineFeedback>{" "}
                /{" "}
                <InlineFeedback
                    varName="answerWriteFractionBottom"
                    correctValue="4"
                    position="terminal"
                    successMessage="— excellent! The fraction is 3/4 or three quarters"
                    failureMessage="— count all the parts"
                    hint="How many parts total make up the whole circle?"
                >
                    <InlineClozeInput
                        varName="answerWriteFractionBottom"
                        correctAnswer="4"
                        {...clozePropsFromDefinition(
                            getVariableInfo("answerWriteFractionBottom")
                        )}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
