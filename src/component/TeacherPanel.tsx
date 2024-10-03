import { useState, useContext } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Container,
  Heading,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Flex,
  Divider,
  useToast,
  Badge,
  Center,
} from "@chakra-ui/react";
import { QuizContext } from "../context/QuizContext";
import { AddIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";

const TeacherPanel = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [quizQuestions, setQuizQuestions] = useState([
    { question: "", type: "MCQ", options: ["", "", "", ""] },
  ]);
  const { activateQuiz, quizActive } = useContext(QuizContext);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const toast = useToast();

  const handleActivateQuiz = () => {
    if (!quizTitle.trim()) {
      toast({
        title: "Quiz Title Required",
        description: "Please enter a title for your quiz.",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    if (quizQuestions.some((q) => !q.question.trim())) {
      toast({
        title: "Incomplete Questions",
        description: "Please fill in all question fields.",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    activateQuiz(quizTitle, timeLimit);
    toast({
      title: "Quiz Activated",
      description: "Students can now join the quiz.",
      status: "success",
      duration: 3000,
    });
  };

  const handleAddQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      { question: "", type: "MCQ", options: ["", "", "", ""] },
    ]);
  };

  const handleDeleteQuestion = (index: number) => {
    if (quizQuestions.length > 1) {
      const updatedQuestions = quizQuestions.filter((_, i) => i !== index);
      setQuizQuestions(updatedQuestions);
    }
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedQuestions = [...quizQuestions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field === "type") {
      updatedQuestions[index].type = value;
      updatedQuestions[index].options =
        value === "MCQ" ? ["", "", "", ""] : ["True", "False"];
    }
    setQuizQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    index: number,
    optIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].options[optIndex] = value;
    setQuizQuestions(updatedQuestions);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Flex mr={4} justifyContent="space-between" alignItems="center">
          <Heading ml={5} size="lg" color="teal.600">
            Create Quiz
          </Heading>
          <Badge
            colorScheme={quizActive ? "green" : "gray"}
            p={2}
            borderRadius="md"
            fontSize="md"
          >
            {quizActive ? "Quiz Active" : "Quiz Inactive"}
          </Badge>
        </Flex>

        <Card>
          <CardHeader>
            <Heading size="md" color="teal.500">
              Quiz Details
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2} fontWeight="medium">
                  Quiz Title
                </Text>
                <Input
                  placeholder="Enter an engaging title for your quiz"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  size="lg"
                  borderColor="teal.300" // Change input border color
                />
              </Box>
              <Box w="100%">
                <Text mb={2} fontWeight="medium">
                  Time Limit (minutes)
                </Text>
                <Input
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  size="lg"
                  borderColor="teal.300" // Change input border color
                />
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md" color="teal.500">
                Questions
              </Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal" // Change button color
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              {quizQuestions.map((q, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  borderColor="teal.200"
                >
                  <Flex justifyContent="space-between" mb={4}>
                    <Heading size="sm" color="teal.600">
                      Question {index + 1}
                    </Heading>
                    <IconButton
                      aria-label="Delete question"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteQuestion(index)}
                      colorScheme="red"
                      variant="ghost"
                      isDisabled={quizQuestions.length === 1}
                    />
                  </Flex>
                  <VStack spacing={4} align="stretch">
                    <Input
                      placeholder="Enter your question here"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(index, "question", e.target.value)
                      }
                      size="lg"
                      borderColor="teal.300" // Change input border color
                    />
                    <Select
                      value={q.type}
                      onChange={(e) =>
                        handleQuestionChange(index, "type", e.target.value)
                      }
                      size="lg"
                      color="teal.600" // Change select text color
                    >
                      <option value="MCQ">Multiple Choice</option>
                      <option value="True/False">True/False</option>
                    </Select>
                    <VStack spacing={2} align="stretch">
                      {q.options.map((option, optIndex) => (
                        <Input
                          key={optIndex}
                          placeholder={`Option ${optIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, optIndex, e.target.value)
                          }
                          size="md"
                          borderColor="teal.300" // Change input border color
                        />
                      ))}
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Flex ml={700} gap={5}>
          <Button
            leftIcon={<ViewIcon />}
            colorScheme="teal" // Change button color
            onClick={() => setPreviewOpen(true)}
            size="lg"
          >
            Preview Quiz
          </Button>
          <Button
            colorScheme="green"
            onClick={handleActivateQuiz}
            isDisabled={quizActive}
            size="lg"
          >
            Activate Quiz
          </Button>
        </Flex>
      </VStack>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="teal.600">Quiz Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" fontSize="xl" color="teal.600">
                  {quizTitle}
                </Text>
                <Text color="gray.600">Time Limit: {timeLimit} minutes</Text>
              </Box>
              <Divider />
              {quizQuestions.map((q, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  borderColor="teal.200"
                >
                  <Text fontWeight="medium" mb={2}>
                    {index + 1}. {q.question}
                  </Text>
                  <Badge
                    mb={2}
                    colorScheme={q.type === "MCQ" ? "blue" : "yellow"}
                  >
                    {q.type}
                  </Badge>
                  <VStack align="stretch" pl={4}>
                    {q.options.map((option, optIndex) => (
                      <Text key={optIndex}>• {option}</Text>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setPreviewOpen(false)}>
              Close Preview
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default TeacherPanel;
