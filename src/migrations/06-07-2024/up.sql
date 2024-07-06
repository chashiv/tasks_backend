-- Create ENUM type for TaskStatusEnum
CREATE TYPE task_status_enum AS ENUM ('TO_DO', 'IN_PROGRESS', 'DONE');

-- Create Tasks table
CREATE TABLE Tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status task_status_enum DEFAULT 'TO_DO',
  metaData JSONB
);
