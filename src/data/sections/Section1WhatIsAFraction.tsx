/**
 * Section 1: What is a Fraction?
 *
 * Introduces fractions through a pizza-sharing scenario.
 * Students learn that fractions represent parts of a whole.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeChoice,
    InlineFeedback,
    InlineTooltip,
} from "@/components/atoms";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ============================================
// REACTIVE PIZZA VISUALIZATION
// ============================================

function ReactivePizzaVisualization() {
    const totalSlices = useVar("pizzaTotalSlices", 4) as number;
    const shadedSlices = useVar("pizzaShadedSlices", 1) as number;

    // Ensure shaded slices don't exceed total
    const actualShaded = Math.min(shadedSlices, totalSlices);

    const centerX = 150;
    const centerY = 150;
    const radius = 120;

    // Generate pizza slices
    const slices = [];
    for (let i = 0; i < totalSlices; i++) {
        const startAngle = (i * 360) / totalSlices - 90;
        const endAngle = ((i + 1) * 360) / totalSlices - 90;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);

        const largeArc = 360 / totalSlices > 180 ? 1 : 0;

        const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        const isShaded = i < actualShaded;

        slices.push(
            <path
                key={i}
                d={pathD}
                fill={isShaded ? "#F7B23B" : "#FEF3C7"}
                stroke="#D97706"
                strokeWidth="2"
            />
        );

        // Add pepperoni circles to make it look like pizza
        if (!isShaded) {
            const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
            const pepX = centerX + radius * 0.6 * Math.cos(midAngle);
            const pepY = centerY + radius * 0.6 * Math.sin(midAngle);
            slices.push(
                <circle
                    key={`pep-${i}`}
                    cx={pepX}
                    cy={pepY}
                    r="8"
                    fill="#DC2626"
                    opacity="0.7"
                />
            );
        }
    }

    return (
        <div className="relative flex flex-col items-center">
            <svg width="300" height="300" viewBox="0 0 300 300">
                {/* Pizza crust circle */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius + 10}
                    fill="#D2691E"
                    opacity="0.3"
                />
                {/* Pizza slices */}
                {slices}
                {/* Center dot */}
                <circle cx={centerX} cy={centerY} r="5" fill="#92400E" />
            </svg>

            {/* Fraction display */}
            <div className="mt-4 text-center">
                <div className="text-3xl font-bold">
                    <span style={{ color: "#F7B23B" }}>{actualShaded}</span>
                    <span className="mx-1">/</span>
                    <span style={{ color: "#62D0AD" }}>{totalSlices}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                    {actualShaded} out of {totalSlices} slices
                </p>
            </div>

            <InteractionHintSequence
                hintKey="pizza-slices-hint"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the numbers to change the pizza",
                        position: { x: "50%", y: "50%" },
                    },
                ]}
            />
        </div>
    );
}

// ============================================
// SECTION BLOCKS
// ============================================

export const section1Blocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-fractions-title" maxWidth="xl">
        <Block id="fractions-title" padding="lg">
            <EditableH1 id="h1-fractions-title" blockId="fractions-title">
                Introduction to Fractions
            </EditableH1>
        </Block>
    </StackLayout>,

    // Section 1 heading
    <StackLayout key="layout-section1-heading" maxWidth="xl">
        <Block id="section1-heading" padding="md">
            <EditableH2 id="h2-section1-heading" blockId="section1-heading">
                What is a Fraction?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction paragraph
    <StackLayout key="layout-section1-intro" maxWidth="xl">
        <Block id="section1-intro" padding="sm">
            <EditableParagraph id="para-section1-intro" blockId="section1-intro">
                Imagine you have a delicious pizza to share with your friends.
                You cut it into equal pieces so everyone gets the same amount.
                But how do you describe how much pizza each person gets? This is
                where{" "}
                <InlineTooltip
                    id="tooltip-fraction-def"
                    tooltip="A way to show part of something whole, written with one number over another"
                >
                    fractions
                </InlineTooltip>{" "}
                come in handy!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive pizza visualization
    <SplitLayout key="layout-section1-pizza" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="section1-pizza-controls" padding="sm">
                <EditableParagraph
                    id="para-section1-pizza-controls"
                    blockId="section1-pizza-controls"
                >
                    Let's explore with a pizza! This pizza is cut into{" "}
                    <InlineScrubbleNumber
                        varName="pizzaTotalSlices"
                        {...numberPropsFromDefinition(
                            getVariableInfo("pizzaTotalSlices")
                        )}
                    />{" "}
                    equal slices. If we take{" "}
                    <InlineScrubbleNumber
                        varName="pizzaShadedSlices"
                        {...numberPropsFromDefinition(
                            getVariableInfo("pizzaShadedSlices")
                        )}
                    />{" "}
                    slice, we can write this as a fraction. The{" "}
                    <strong style={{ color: "#F7B23B" }}>
                        orange slices
                    </strong>{" "}
                    show the part we took, and all the slices together show the{" "}
                    <strong style={{ color: "#62D0AD" }}>whole pizza</strong>.
                </EditableParagraph>
            </Block>
            <Block id="section1-pizza-explanation" padding="sm">
                <EditableParagraph
                    id="para-section1-pizza-explanation"
                    blockId="section1-pizza-explanation"
                >
                    A fraction tells us how many parts we have out of the total
                    number of equal parts. When we write a fraction, the number
                    on top shows what we have, and the number on the bottom
                    shows how many pieces there are in total.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="section1-pizza-visual" padding="sm" hasVisualization>
            <ReactivePizzaVisualization />
        </Block>
    </SplitLayout>,

    // Key concept
    <StackLayout key="layout-section1-key-concept" maxWidth="xl">
        <Block id="section1-key-concept" padding="md">
            <EditableParagraph
                id="para-section1-key-concept"
                blockId="section1-key-concept"
            >
                <strong>Remember:</strong> A fraction shows a{" "}
                <strong>part</strong> of a <strong>whole</strong>. The whole
                must be divided into <strong>equal parts</strong> for a fraction
                to make sense. If the pizza slices were different sizes, it
                wouldn't be fair!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment question
    <StackLayout key="layout-section1-question" maxWidth="xl">
        <Block id="section1-question" padding="md">
            <EditableParagraph
                id="para-section1-question"
                blockId="section1-question"
            >
                <strong>Quick Check:</strong> When we want to describe a part of
                something whole, we use a special name. What do we call it when
                we write one number over another to show parts of a whole? We
                call it a{" "}
                <InlineFeedback
                    varName="answerWhatIsFraction"
                    correctValue="fraction"
                    position="terminal"
                    successMessage="— well done! Fractions help us describe parts of things"
                    failureMessage="— not quite."
                    hint="Think about the special name for parts of a whole"
                    reviewBlockId="section1-intro"
                    reviewLabel="Review the introduction"
                >
                    <InlineClozeChoice
                        varName="answerWhatIsFraction"
                        correctAnswer="fraction"
                        options={["number", "fraction", "decimal", "percent"]}
                        {...choicePropsFromDefinition(
                            getVariableInfo("answerWhatIsFraction")
                        )}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
