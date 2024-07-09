-- Create ENUM type for TaskStatusEnum
CREATE TYPE task_status_enum AS ENUM ('TO_DO', 'IN_PROGRESS', 'DONE');

-- Create Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  encrypted_password VARCHAR NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- Create Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status task_status_enum DEFAULT 'TO_DO'::task_status_enum,
  meta_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

