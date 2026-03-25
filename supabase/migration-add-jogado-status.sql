-- Migration: Add 'jogado' as a valid status for user_games
-- Run this in the Supabase SQL editor

ALTER TABLE user_games
  DROP CONSTRAINT IF EXISTS user_games_status_check;

ALTER TABLE user_games
  ADD CONSTRAINT user_games_status_check
  CHECK (status IN ('jogando', 'zerado', 'jogado', 'abandonado', 'backlog', 'pausado'));
