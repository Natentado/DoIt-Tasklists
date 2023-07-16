import { Box, Skeleton, SkeletonProps } from "@chakra-ui/react";

interface CardSkeletonProps extends SkeletonProps {
    repeatCount: number;
};

const CardSkeleton = ({repeatCount, ...rest}: CardSkeletonProps) => {
    const howMany = Array.from(Array(repeatCount).keys())

    return (
        <>
            {howMany.map(_ => (
                <Skeleton {...rest} speed={1} startColor="gray.100" endColor="gray.200">
                    <Box w="300px" h="150px" p="7" />
                </Skeleton>
            ))}
        </>
    );
};

export default CardSkeleton;