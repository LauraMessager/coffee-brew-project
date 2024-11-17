<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241117145830 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brew_guide CHANGE created_by created_by INT NOT NULL, CHANGE created_at created_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE brew_guide ADD CONSTRAINT FK_A86D9D18DE12AB56 FOREIGN KEY (created_by) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_A86D9D18DE12AB56 ON brew_guide (created_by)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brew_guide DROP FOREIGN KEY FK_A86D9D18DE12AB56');
        $this->addSql('DROP INDEX IDX_A86D9D18DE12AB56 ON brew_guide');
        $this->addSql('ALTER TABLE brew_guide CHANGE created_at created_at TIME DEFAULT NULL, CHANGE created_by created_by INT DEFAULT NULL');
    }
}
