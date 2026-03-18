/**
 * Section 5: Fractions in Everyday Life
 *
 * Students discover how fractions appear in daily situations:
 * - Time (half an hour, quarter past)
 * - Sharing food fairly
 * - Recipes and measuring
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout, GridLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineClozeChoice,
    InlineFeedback,
} from "@/components/atoms";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ============================================
// INTERACTIVE CLOCK VISUALIZATION
// ============================================

function ReactiveClockVisualization() {
    const minutes = useVar("clockMinutes", 30) as number;

    const centerX = 120;
    const centerY = 120;
    const radius = 100;

    // Calculate fraction of hour
    const fractionNumerator =
        minutes === 15 ? 1 : minutes === 30 ? 1 : minutes === 45 ? 3 : minutes === 60 ? 1 : minutes;
    const fractionDenominator =
        minutes === 15
            ? 4
            : minutes === 30
            ? 2
            : minutes === 45
            ? 4
            : minutes === 60
            ? 1
            : 60;

    // Calculate minute hand angle (0 minutes = 12 o'clock = -90 degrees)
    const minuteAngle = (minutes / 60) * 360 - 90;
    const minuteRad = (minuteAngle * Math.PI) / 180;
    const minuteHandX = centerX + 75 * Math.cos(minuteRad);
    const minuteHandY = centerY + 75 * Math.sin(minuteRad);

    // Hour hand (simplified - just show 12 for this demo)
    const hourAngle = -90; // pointing at 12
    const hourRad = (hourAngle * Math.PI) / 180;
    const hourHandX = centerX + 50 * Math.cos(hourRad);
    const hourHandY = centerY + 50 * Math.sin(hourRad);

    // Generate shaded arc for minutes passed
    const shadedArc = (() => {
        if (minutes === 0) return null;
        const startAngle = -90;
        const endAngle = (minutes / 60) * 360 - 90;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);

        const largeArc = minutes > 30 ? 1 : 0;

        return (
            <path
                d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill="rgba(248, 160, 205, 0.4)"
                stroke="none"
            />
        );
    })();

    // Clock numbers
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
        const angle = ((i * 30 - 90) * Math.PI) / 180;
        const x = centerX + 80 * Math.cos(angle);
        const y = centerY + 80 * Math.sin(angle);
        numbers.push(
            <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fill="#475569"
                fontWeight="500"
            >
                {i}
            </text>
        );
    }

    const fractionLabel =
        minutes === 15
            ? "quarter"
            : minutes === 30
            ? "half"
            : minutes === 45
            ? "three quarters"
            : minutes === 60
            ? "one whole"
            : `${minutes}/60`;

    return (
        <div className="relative flex flex-col items-center">
            <svg width="240" height="240" viewBox="0 0 240 240">
                {/* Clock face */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="white"
                    stroke="#CBD5E1"
                    strokeWidth="3"
                />

                {/* Shaded portion */}
                {shadedArc}

                {/* Tick marks */}
                {[...Array(12)].map((_, i) => {
                    const angle = ((i * 30 - 90) * Math.PI) / 180;
                    const x1 = centerX + 90 * Math.cos(angle);
                    const y1 = centerY + 90 * Math.sin(angle);
                    const x2 = centerX + 100 * Math.cos(angle);
                    const y2 = centerY + 100 * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#94A3B8"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Clock numbers */}
                {numbers}

                {/* Hour hand */}
                <line
                    x1={centerX}
                    y1={centerY}
                    x2={hourHandX}
                    y2={hourHandY}
                    stroke="#1E293B"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Minute hand */}
                <line
                    x1={centerX}
                    y1={centerY}
                    x2={minuteHandX}
                    y2={minuteHandY}
                    stroke="#F8A0CD"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Center dot */}
                <circle cx={centerX} cy={centerY} r="5" fill="#1E293B" />
            </svg>

            <div className="mt-4 text-center">
                <p className="text-lg">
                    <strong style={{ color: "#F8A0CD" }}>{minutes}</strong>{" "}
                    minutes past the hour
                </p>
                <p className="text-xl font-bold mt-1">
                    = {fractionNumerator}/{fractionDenominator} of an hour
                </p>
                <p className="text-sm text-slate-600">({fractionLabel} of an hour)</p>
            </div>

            <InteractionHintSequence
                hintKey="clock-fraction-hint"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag to change the minutes",
                        position: { x: "50%", y: "45%" },
                    },
                ]}
            />
        </div>
    );
}

// ============================================
// PIZZA SHARING SCENARIO
// ============================================

function PizzaSharingVisual() {
    // 4 slices, 1 taken (3 remaining = 3/4 left)
    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const totalSlices = 4;
    const takenSlices = 1;

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

        const isTaken = i < takenSlices;

        slices.push(
            <path
                key={i}
                d={pathD}
                fill={isTaken ? "#F1F5F9" : "#F7B23B"}
                stroke={isTaken ? "#CBD5E1" : "#D97706"}
                strokeWidth="2"
                strokeDasharray={isTaken ? "5,5" : "none"}
            />
        );

        // Add pepperoni to remaining slices
        if (!isTaken) {
            const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
            const pepX = centerX + radius * 0.55 * Math.cos(midAngle);
            const pepY = centerY + radius * 0.55 * Math.sin(midAngle);
            slices.push(
                <circle
                    key={`pep-${i}`}
                    cx={pepX}
                    cy={pepY}
                    r="6"
                    fill="#DC2626"
                    opacity="0.7"
                />
            );
        }
    }

    return (
        <div className="flex flex-col items-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius + 8}
                    fill="#D2691E"
                    opacity="0.3"
                />
                {slices}
                <circle cx={centerX} cy={centerY} r="4" fill="#92400E" />
            </svg>
            <p className="text-sm text-slate-600 mt-2">
                One slice taken (shown with dotted lines)
            </p>
        </div>
    );
}

// ============================================
// EVERYDAY EXAMPLES CARDS
// ============================================

function EverydayExampleCard({
    title,
    example,
    fraction,
    color,
    icon,
}: {
    title: string;
    example: string;
    fraction: string;
    color: string;
    icon: string;
}) {
    return (
        <div
            className="p-4 rounded-lg border-2 bg-white"
            style={{ borderColor: color }}
        >
            <div className="text-3xl mb-2">{icon}</div>
            <h4 className="font-bold text-lg" style={{ color }}>
                {title}
            </h4>
            <p className="text-sm text-slate-600 mt-1">{example}</p>
            <p className="text-xl font-bold mt-2" style={{ color }}>
                {fraction}
            </p>
        </div>
    );
}

// ============================================
// SECTION BLOCKS
// ============================================

export const section5Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-section5-heading" maxWidth="xl">
        <Block id="section5-heading" padding="md">
            <EditableH2 id="h2-section5-heading" blockId="section5-heading">
                Fractions in Everyday Life
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-section5-intro" maxWidth="xl">
        <Block id="section5-intro" padding="sm">
            <EditableParagraph id="para-section5-intro" blockId="section5-intro">
                Fractions are everywhere around us! Once you start looking, you
                will see them in time, sharing food, recipes, and many other
                places. Let's explore some examples of fractions in real life.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Time and fractions
    <SplitLayout key="layout-section5-clock" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="section5-clock-explanation" padding="sm">
                <EditableParagraph
                    id="para-section5-clock-explanation"
                    blockId="section5-clock-explanation"
                >
                    <strong>Time and Fractions:</strong> We use fractions to
                    talk about time all the time! When the minute hand has moved{" "}
                    <InlineScrubbleNumber
                        varName="clockMinutes"
                        {...numberPropsFromDefinition(
                            getVariableInfo("clockMinutes")
                        )}
                    />{" "}
                    minutes, we can describe this as a fraction of an hour.
                </EditableParagraph>
            </Block>
            <Block id="section5-clock-examples" padding="sm">
                <EditableParagraph
                    id="para-section5-clock-examples"
                    blockId="section5-clock-examples"
                >
                    For example: "half past" means 30 minutes (1/2 of an hour),
                    "quarter past" means 15 minutes (1/4 of an hour), and
                    "quarter to" means 45 minutes have passed (3/4 of an hour).
                </EditableParagraph>
            </Block>
        </div>
        <Block id="section5-clock-visual" padding="sm" hasVisualization>
            <ReactiveClockVisualization />
        </Block>
    </SplitLayout>,

    // Everyday examples grid
    <StackLayout key="layout-section5-examples-title" maxWidth="xl">
        <Block id="section5-examples-title" padding="sm">
            <EditableParagraph
                id="para-section5-examples-title"
                blockId="section5-examples-title"
            >
                <strong>More Fractions in Daily Life:</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <GridLayout key="layout-section5-examples" columns={3} gap="md">
        <Block id="section5-example-sharing" padding="sm">
            <EverydayExampleCard
                title="Sharing Fairly"
                example="Split a chocolate bar equally between 4 friends"
                fraction="1/4 each"
                color="#8E90F5"
                icon="🍫"
            />
        </Block>
        <Block id="section5-example-recipes" padding="sm">
            <EverydayExampleCard
                title="Cooking"
                example="Use half a cup of sugar in a recipe"
                fraction="1/2 cup"
                color="#62D0AD"
                icon="🥣"
            />
        </Block>
        <Block id="section5-example-sports" padding="sm">
            <EverydayExampleCard
                title="Sports"
                example="Halftime in a football match"
                fraction="1/2 of the game"
                color="#F7B23B"
                icon="⚽"
            />
        </Block>
    </GridLayout>,

    // Pizza sharing question
    <StackLayout key="layout-section5-pizza-question-intro" maxWidth="xl">
        <Block id="section5-pizza-question-intro" padding="md">
            <EditableParagraph
                id="para-section5-pizza-question-intro"
                blockId="section5-pizza-question-intro"
            >
                <strong>Real-Life Problem:</strong> You have a pizza cut into 4
                equal slices. Your friend takes 1 slice. Look at the picture and
                answer: what fraction of the pizza is left?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-section5-pizza-visual" maxWidth="sm">
        <Block id="section5-pizza-visual" padding="sm">
            <PizzaSharingVisual />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-section5-pizza-question" maxWidth="xl">
        <Block id="section5-pizza-question" padding="sm">
            <EditableParagraph
                id="para-section5-pizza-question"
                blockId="section5-pizza-question"
            >
                The fraction of pizza remaining is{" "}
                <InlineFeedback
                    varName="answerPizzaFraction"
                    correctValue="3/4"
                    position="terminal"
                    successMessage="— brilliant! 3 out of 4 slices are left, which is 3/4 or three quarters"
                    failureMessage="— count how many coloured slices remain"
                    hint="There were 4 slices total, and 1 was taken away"
                >
                    <InlineClozeChoice
                        varName="answerPizzaFraction"
                        correctAnswer="3/4"
                        options={["1/4", "2/4", "3/4", "4/4"]}
                        {...choicePropsFromDefinition(
                            getVariableInfo("answerPizzaFraction")
                        )}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Time question
    <StackLayout key="layout-section5-time-question" maxWidth="xl">
        <Block id="section5-time-question" padding="md">
            <EditableParagraph
                id="para-section5-time-question"
                blockId="section5-time-question"
            >
                <strong>Final Challenge:</strong> If half an hour has passed,
                how many minutes is that? Half an hour equals{" "}
                <InlineFeedback
                    varName="answerHalfHour"
                    correctValue="30"
                    position="terminal"
                    successMessage="— perfect! Half of 60 minutes is 30 minutes"
                    failureMessage="— think about what half of 60 is"
                    hint="An hour has 60 minutes, so half would be..."
                    reviewBlockId="section5-clock-examples"
                    reviewLabel="Review the clock"
                >
                    <InlineClozeInput
                        varName="answerHalfHour"
                        correctAnswer="30"
                        {...clozePropsFromDefinition(
                            getVariableInfo("answerHalfHour")
                        )}
                    />
                </InlineFeedback>{" "}
                minutes.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Conclusion
    <StackLayout key="layout-section5-conclusion" maxWidth="xl">
        <Block id="section5-conclusion" padding="lg">
            <EditableParagraph
                id="para-section5-conclusion"
                blockId="section5-conclusion"
            >
                <strong>Well Done!</strong> You have learned what fractions are,
                how to identify the numerator and denominator, how to read and
                write fractions, and where to find them in everyday life. Keep
                looking for fractions around you!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
