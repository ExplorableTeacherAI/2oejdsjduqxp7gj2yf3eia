/**
 * Section 3: Numerator and Denominator
 *
 * Students learn the names of the parts of a fraction:
 * - Numerator (top number): how many parts we have
 * - Denominator (bottom number): total equal parts
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeChoice,
    InlineFeedback,
    InlineSpotColor,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
    scrubVarsFromDefinitions,
} from "../variables";
import { useVar } from "@/stores";

// ============================================
// REACTIVE FRACTION VISUAL WITH LABELS
// ============================================

function ReactiveFractionVisual() {
    const numerator = useVar("numeratorValue", 3) as number;
    const denominator = useVar("denominatorValue", 4) as number;

    const actualNumerator = Math.min(numerator, denominator);

    const centerX = 150;
    const centerY = 130;
    const radius = 100;

    // Generate circle slices
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

        const isShaded = i < actualNumerator;

        slices.push(
            <path
                key={i}
                d={pathD}
                fill={isShaded ? "#F7B23B" : "#FEF9C3"}
                stroke="#CA8A04"
                strokeWidth="2"
            />
        );
    }

    return (
        <div className="relative flex flex-col items-center">
            <svg width="300" height="300" viewBox="0 0 300 300">
                {slices}
                <circle cx={centerX} cy={centerY} r="4" fill="#92400E" />

                {/* Labels pointing to parts */}
                {/* Numerator arrow */}
                <line
                    x1="230"
                    y1="80"
                    x2="180"
                    y2="100"
                    stroke="#F7B23B"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                />
                <text
                    x="235"
                    y="75"
                    fill="#F7B23B"
                    fontSize="14"
                    fontWeight="bold"
                >
                    Shaded parts
                </text>

                {/* Arrow marker */}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94A3B8" />
                    </marker>
                </defs>
            </svg>

            {/* Large fraction display with labels */}
            <div className="flex items-center gap-8 mt-2">
                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <span
                            className="text-4xl font-bold"
                            style={{ color: "#F7B23B" }}
                        >
                            {actualNumerator}
                        </span>
                        <div
                            className="w-12 h-1 my-1"
                            style={{ backgroundColor: "#64748B" }}
                        ></div>
                        <span
                            className="text-4xl font-bold"
                            style={{ color: "#62D0AD" }}
                        >
                            {denominator}
                        </span>
                    </div>
                </div>
                <div className="text-left text-sm">
                    <p style={{ color: "#F7B23B" }} className="font-semibold">
                        ← Numerator
                    </p>
                    <p className="text-slate-400 my-1">(the line)</p>
                    <p style={{ color: "#62D0AD" }} className="font-semibold">
                        ← Denominator
                    </p>
                </div>
            </div>

            <InteractionHintSequence
                hintKey="numerator-denominator-hint"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the numbers to explore",
                        position: { x: "50%", y: "45%" },
                    },
                ]}
            />
        </div>
    );
}

// ============================================
// SECTION BLOCKS
// ============================================

export const section3Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-section3-heading" maxWidth="xl">
        <Block id="section3-heading" padding="md">
            <EditableH2 id="h2-section3-heading" blockId="section3-heading">
                Numerator and Denominator
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-section3-intro" maxWidth="xl">
        <Block id="section3-intro" padding="sm">
            <EditableParagraph id="para-section3-intro" blockId="section3-intro">
                Every fraction has two important parts, and each part has a
                special name. Learning these names will help you talk about
                fractions with your friends and teachers!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization with formula
    <SplitLayout key="layout-section3-visual" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="section3-numerator-explain" padding="sm">
                <EditableParagraph
                    id="para-section3-numerator-explain"
                    blockId="section3-numerator-explain"
                >
                    The{" "}
                    <InlineSpotColor varName="numeratorValue" color="#F7B23B">
                        numerator
                    </InlineSpotColor>{" "}
                    is the number on <strong>top</strong> of the fraction. It
                    tells us how many parts we have or are talking about. In our
                    example, the numerator is{" "}
                    <InlineScrubbleNumber
                        varName="numeratorValue"
                        {...numberPropsFromDefinition(
                            getVariableInfo("numeratorValue")
                        )}
                    />
                    .
                </EditableParagraph>
            </Block>
            <Block id="section3-denominator-explain" padding="sm">
                <EditableParagraph
                    id="para-section3-denominator-explain"
                    blockId="section3-denominator-explain"
                >
                    The{" "}
                    <InlineSpotColor varName="denominatorValue" color="#62D0AD">
                        denominator
                    </InlineSpotColor>{" "}
                    is the number on the <strong>bottom</strong>. It tells us
                    how many equal parts the whole is divided into. Here, the
                    denominator is{" "}
                    <InlineScrubbleNumber
                        varName="denominatorValue"
                        {...numberPropsFromDefinition(
                            getVariableInfo("denominatorValue")
                        )}
                    />
                    .
                </EditableParagraph>
            </Block>
            <Block id="section3-formula" padding="sm">
                <FormulaBlock
                    latex="\frac{\clr{numerator}{\scrub{numeratorValue}}}{\clr{denominator}{\scrub{denominatorValue}}}"
                    variables={scrubVarsFromDefinitions([
                        "numeratorValue",
                        "denominatorValue",
                    ])}
                    colorMap={{
                        numerator: "#F7B23B",
                        denominator: "#62D0AD",
                    }}
                />
            </Block>
        </div>
        <Block id="section3-visual" padding="sm" hasVisualization>
            <ReactiveFractionVisual />
        </Block>
    </SplitLayout>,

    // Memory tip
    <StackLayout key="layout-section3-memory-tip" maxWidth="xl">
        <Block id="section3-memory-tip" padding="md">
            <EditableParagraph
                id="para-section3-memory-tip"
                blockId="section3-memory-tip"
            >
                <strong>Memory Tip:</strong> Think of the word{" "}
                <strong>"denominator"</strong> as being{" "}
                <strong>"down"</strong> because it goes on the bottom.{" "}
                <strong>D</strong>enominator = <strong>D</strong>own! The
                numerator is on top, counting how many parts you have.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment questions
    <StackLayout key="layout-section3-question1" maxWidth="xl">
        <Block id="section3-question1" padding="md">
            <EditableParagraph
                id="para-section3-question1"
                blockId="section3-question1"
            >
                <strong>Check Your Understanding:</strong> In the fraction 5/8,
                the numerator (the number 5) tells us the{" "}
                <InlineFeedback
                    varName="answerNumeratorMeaning"
                    correctValue="parts we have"
                    position="terminal"
                    successMessage="— exactly! The numerator counts the parts we're talking about"
                    failureMessage="— remember, the numerator is on top"
                    hint="The top number tells us how many..."
                    reviewBlockId="section3-numerator-explain"
                    reviewLabel="Review numerator"
                >
                    <InlineClozeChoice
                        varName="answerNumeratorMeaning"
                        correctAnswer="parts we have"
                        options={["parts we have", "total parts", "the whole"]}
                        {...choicePropsFromDefinition(
                            getVariableInfo("answerNumeratorMeaning")
                        )}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-section3-question2" maxWidth="xl">
        <Block id="section3-question2" padding="sm">
            <EditableParagraph
                id="para-section3-question2"
                blockId="section3-question2"
            >
                And the denominator (the number 8) tells us the{" "}
                <InlineFeedback
                    varName="answerDenominatorMeaning"
                    correctValue="total equal parts"
                    position="terminal"
                    successMessage="— well done! The denominator shows how many equal pieces make up the whole"
                    failureMessage="— think about what the bottom number represents"
                    hint="The bottom number shows the total number of..."
                    reviewBlockId="section3-denominator-explain"
                    reviewLabel="Review denominator"
                >
                    <InlineClozeChoice
                        varName="answerDenominatorMeaning"
                        correctAnswer="total equal parts"
                        options={["parts we have", "total equal parts", "half"]}
                        {...choicePropsFromDefinition(
                            getVariableInfo("answerDenominatorMeaning")
                        )}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
