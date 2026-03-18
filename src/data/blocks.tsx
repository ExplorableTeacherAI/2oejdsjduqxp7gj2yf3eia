import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import all section blocks
import { section1Blocks } from "./sections/Section1WhatIsAFraction";
import { section2Blocks } from "./sections/Section2PartsOfAWhole";
import { section3Blocks } from "./sections/Section3NumeratorDenominator";
import { section4Blocks } from "./sections/Section4ReadingWritingFractions";
import { section5Blocks } from "./sections/Section5FractionsEverydayLife";

/**
 * ------------------------------------------------------------------
 * INTRODUCTION TO FRACTIONS - Complete Lesson
 * ------------------------------------------------------------------
 *
 * This lesson teaches primary school students (ages 7-12) what fractions are.
 *
 * Learning Objectives:
 * - Understand that fractions represent parts of a whole
 * - Identify the numerator and denominator
 * - Read and write fractions like 1/2, 1/4, 3/4
 *
 * Sections:
 * 1. What is a Fraction? - Pizza sharing introduction
 * 2. Parts of a Whole - Dividing shapes into equal parts
 * 3. Numerator and Denominator - Learning the vocabulary
 * 4. Reading and Writing Fractions - Practice with different fractions
 * 5. Fractions in Everyday Life - Real-world applications
 */

export const blocks: ReactElement[] = [
    ...section1Blocks,
    ...section2Blocks,
    ...section3Blocks,
    ...section4Blocks,
    ...section5Blocks,
];
