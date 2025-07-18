import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Text } from 'react-native-svg';

interface GaugeProps {
    // The current value to display on the gauge
    value: number;
    // The maximum possible value for the gauge
    maxValue?: number;
}

const Gauge: React.FC<GaugeProps> = ({ value = 760, maxValue = 1000 }) => {
    const size = 250;
    const strokeWidth = 25;
    const center = size / 2;
    // Adjust radius to ensure the stroke is within the SVG bounds
    const radius = (size - strokeWidth) / 2;

    // Helper function to create an SVG arc path
    const describeArc = (x: number, y: number, r: number, startAngle: number, endAngle: number): string => {
        const start = {
            x: x + r * Math.cos(startAngle * Math.PI / 180),
            y: y + r * Math.sin(startAngle * Math.PI / 180)
        };
        const end = {
            x: x + r * Math.cos(endAngle * Math.PI / 180),
            y: y + r * Math.sin(endAngle * Math.PI / 180)
        };
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        // This is the SVG path command for an arc.
        // The '1' for the sweep-flag is crucial for drawing the arc clockwise.
        // This was the primary source of the "breaking" issue.
        return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };

    // Defines the 5 segments of the gauge, from left to right
    const segments = [
        { color: '#F44336' },    // Red
        { color: '#FF9800' },   // Orange
        { color: '#FFEB3B' },   // Yellow
        { color: '#8BC34A' },   // Light Green
        { color: '#4CAF50' },   // Green
    ]
    const segmentAngle = 36; // 180 degrees / 5 segments = 36 degrees per segment
    const startAngle = 180; // Start at the left side (180 degrees)

    // Determines the status text and number of segments to color based on the value
    const getStatusInfo = (val: number) => {
        const percentage = (Math.max(0, Math.min(val, maxValue)) / maxValue) * 100;
        if (percentage <= 20) return { text: 'POOR', segmentsToColor: 1, color: segments[0].color };
        if (percentage <= 40) return { text: 'FAIR', segmentsToColor: 2, color: segments[1].color };
        if (percentage <= 60) return { text: 'AVERAGE', segmentsToColor: 3, color: segments[2].color };
        if (percentage <= 80) return { text: 'GOOD', segmentsToColor: 4, color: segments[3].color };
        return { text: 'EXCELLENT', segmentsToColor: 5, color: segments[4].color };
    };

    const statusInfo = getStatusInfo(value);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                {/* Center the gauge and contents */}
                <G>
                    {/* 1. Background Gray Arc */}
                    <Path
                        d={describeArc(center, center, radius, 180, 360)}
                        fill="none"
                        stroke="#424242"
                        strokeWidth={strokeWidth}
                        // Use "round" linecap for a smooth, complete arc
                        strokeLinecap="round"
                    />

                    {/* 2. Colored Segments */}
                    {segments.slice(0, statusInfo.segmentsToColor).map((segment, index) => {
                        const segStartAngle = startAngle + (index * segmentAngle);
                        const segEndAngle = segStartAngle + segmentAngle;
                        return (
                            <Path
                                key={index}
                                d={describeArc(center, center, radius, segStartAngle, segEndAngle)}
                                fill="none"
                                stroke={segment.color}
                                strokeWidth={strokeWidth}
                                // Using "round" here fixes the "breaking" by giving each
                                // segment its own rounded cap, creating a nice visual separation.
                                strokeLinecap="round"
                            />
                        );
                    })}

                    {/* 3. Central Display: Value, Line, and Status */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius - strokeWidth / 1.5}
                        fill="#3B3B3B"
                    />
                    <Text
                        x={center}
                        y={center - 20}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill="white"
                        fontSize="32"
                        fontWeight="bold"
                    >
                        {value}
                    </Text>
                    <Line
                        x1={center - 100}
                        y1={center + 5}
                        x2={center + 100}
                        y2={center + 5}
                        stroke="white"
                        strokeWidth="10"
                    />
                    <Text
                        x={center}
                        y={center + 35}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill={statusInfo.color}
                        fontSize="18"
                        fontWeight="bold"
                        letterSpacing={1.5}
                    >
                        {statusInfo.text}
                    </Text>
                </G>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Gauge;