// pages/index.tsx
import { Box, Button, Text, Heading, Image, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import Link from "next/link";

const LandingPage = () => {
  const { quizActive } = useContext(QuizContext);
  
  return (
    <Flex height="100vh">
      {/* Left Image Section */}
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
        <Image 
          src="https://www.thetilt.com/wp-content/uploads/2023/03/creator-mind.jpg"
          alt="Quiz App"
          width="100%" 
          height="100%" 
          objectFit="cover" 
          borderRadius="md"
        />
      </Box>
      
      {/* Right Content Section */}
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={5}>
        <Heading mb={6}>Welcome to the Quiz App</Heading>
        
        <Link href="/teacher">
          <Button colorScheme="teal" mb={4} width="full">Teacher Panel</Button>
        </Link>
        
        <Text mb={4}>Select Your Name:</Text>
        <Box>
          {["Student A", "Student B", "Student C"].map((student) => (
            <Button 
              key={student} 
              colorScheme="blue" 
              isDisabled={!quizActive} 
              onClick={() => {
                // Handle student selection logic here, if needed
              }}
              width="full" 
              mb={2} 
            >
              {student}
            </Button>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default LandingPage;
