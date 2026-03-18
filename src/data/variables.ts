/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 FRACTIONS LESSON VARIABLES
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ========================================
    // SECTION 1: WHAT IS A FRACTION
    // ========================================

    // Pizza slices - total number of slices
    pizzaTotalSlices: {
        defaultValue: 4,
        type: 'number',
        label: 'Total Pizza Slices',
        description: 'Number of equal slices the pizza is divided into',
        min: 2,
        max: 8,
        step: 1,
        color: '#62D0AD',
    },

    // Pizza slices - shaded slices (eaten/taken)
    pizzaShadedSlices: {
        defaultValue: 1,
        type: 'number',
        label: 'Shaded Slices',
        description: 'Number of slices that are shaded/taken',
        min: 0,
        max: 8,
        step: 1,
        color: '#F7B23B',
    },

    // ========================================
    // SECTION 2: PARTS OF A WHOLE
    // ========================================

    // Shape divider - number of parts
    shapeParts: {
        defaultValue: 4,
        type: 'number',
        label: 'Number of Parts',
        description: 'Number of equal parts to divide the shape into',
        min: 2,
        max: 8,
        step: 1,
        color: '#8E90F5',
    },

    // Shape divider - shaded parts
    shapeShadedParts: {
        defaultValue: 1,
        type: 'number',
        label: 'Shaded Parts',
        description: 'Number of parts that are shaded',
        min: 0,
        max: 8,
        step: 1,
        color: '#AC8BF9',
    },

    // Shape type selector
    shapeType: {
        defaultValue: 'circle',
        type: 'select',
        label: 'Shape Type',
        description: 'The shape to divide into parts',
        options: ['circle', 'rectangle'],
        color: '#62CCF9',
    },

    // ========================================
    // SECTION 3: NUMERATOR AND DENOMINATOR
    // ========================================

    // Understanding numerator
    numeratorValue: {
        defaultValue: 3,
        type: 'number',
        label: 'Numerator',
        description: 'The top number in a fraction - how many parts we have',
        min: 0,
        max: 8,
        step: 1,
        color: '#F7B23B',
    },

    // Understanding denominator
    denominatorValue: {
        defaultValue: 4,
        type: 'number',
        label: 'Denominator',
        description: 'The bottom number in a fraction - total equal parts',
        min: 1,
        max: 8,
        step: 1,
        color: '#62D0AD',
    },

    // ========================================
    // SECTION 4: READING AND WRITING FRACTIONS
    // ========================================

    // Practice fraction - total parts
    practiceTotalParts: {
        defaultValue: 4,
        type: 'number',
        label: 'Practice Total Parts',
        description: 'Total parts for practice question',
        min: 2,
        max: 8,
        step: 1,
        color: '#62D0AD',
    },

    // Practice fraction - shaded parts
    practiceShadedParts: {
        defaultValue: 3,
        type: 'number',
        label: 'Practice Shaded Parts',
        description: 'Shaded parts for practice question',
        min: 1,
        max: 8,
        step: 1,
        color: '#F7B23B',
    },

    // ========================================
    // SECTION 5: FRACTIONS IN EVERYDAY LIFE
    // ========================================

    // Clock fraction (minutes as fraction of hour)
    clockMinutes: {
        defaultValue: 30,
        type: 'number',
        label: 'Minutes',
        description: 'Minutes past the hour',
        min: 0,
        max: 60,
        step: 15,
        color: '#F8A0CD',
    },

    // ========================================
    // ASSESSMENT VARIABLES (CLOZE INPUTS)
    // ========================================

    // Section 1 question - what do we call parts of a whole
    answerWhatIsFraction: {
        defaultValue: '',
        type: 'select',
        label: 'What is a fraction answer',
        description: 'Student answer for what we call parts of a whole',
        placeholder: '???',
        correctAnswer: 'fraction',
        options: ['number', 'fraction', 'decimal', 'percent'],
        color: '#8E90F5',
    },

    // Section 2 question - identify fraction from visual
    answerPartsShaded: {
        defaultValue: '',
        type: 'text',
        label: 'Parts Shaded Answer',
        description: 'Student answer for number of shaded parts',
        placeholder: '?',
        correctAnswer: '2',
        color: '#F7B23B',
    },

    answerTotalParts: {
        defaultValue: '',
        type: 'text',
        label: 'Total Parts Answer',
        description: 'Student answer for total number of parts',
        placeholder: '?',
        correctAnswer: '4',
        color: '#62D0AD',
    },

    // Section 3 question - identify numerator
    answerNumeratorMeaning: {
        defaultValue: '',
        type: 'select',
        label: 'Numerator Meaning',
        description: 'What the numerator tells us',
        placeholder: '???',
        correctAnswer: 'parts we have',
        options: ['parts we have', 'total parts', 'the whole'],
        color: '#F7B23B',
    },

    // Section 3 question - identify denominator
    answerDenominatorMeaning: {
        defaultValue: '',
        type: 'select',
        label: 'Denominator Meaning',
        description: 'What the denominator tells us',
        placeholder: '???',
        correctAnswer: 'total equal parts',
        options: ['parts we have', 'total equal parts', 'half'],
        color: '#62D0AD',
    },

    // Section 4 question - write fraction from picture
    answerWriteFractionTop: {
        defaultValue: '',
        type: 'text',
        label: 'Fraction Numerator',
        description: 'Write the numerator of the fraction shown',
        placeholder: '?',
        correctAnswer: '3',
        color: '#F7B23B',
    },

    answerWriteFractionBottom: {
        defaultValue: '',
        type: 'text',
        label: 'Fraction Denominator',
        description: 'Write the denominator of the fraction shown',
        placeholder: '?',
        correctAnswer: '4',
        color: '#62D0AD',
    },

    // Section 5 question - real life fraction
    answerHalfHour: {
        defaultValue: '',
        type: 'text',
        label: 'Half Hour Minutes',
        description: 'How many minutes in half an hour',
        placeholder: '??',
        correctAnswer: '30',
        color: '#F8A0CD',
    },

    // Section 5 - pizza real life
    answerPizzaFraction: {
        defaultValue: '',
        type: 'select',
        label: 'Pizza Fraction Answer',
        description: 'What fraction of the pizza is left',
        placeholder: '???',
        correctAnswer: '3/4',
        options: ['1/4', '2/4', '3/4', '4/4'],
        color: '#62D0AD',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
